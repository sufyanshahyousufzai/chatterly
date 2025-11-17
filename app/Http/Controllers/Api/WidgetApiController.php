<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use App\Models\ChatMessage;
use App\Models\ChatWidgetSetting;
use App\Models\Company;
use App\Models\Visitor;
use App\Events\MessageSent;
use App\Events\VisitorOnline;
use App\Services\ChatbotService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WidgetApiController extends Controller
{
    public function getSettings($companyUuid)
    {
        $company = Company::where('uuid', $companyUuid)->firstOrFail();

        $settings = ChatWidgetSetting::where('company_id', $company->id)->first();

        if (!$settings) {
            $settings = ChatWidgetSetting::create([
                'company_id' => $company->id,
                'widget_position' => 'bottom-right',
                'primary_color' => '#E11D48',
                'online_message' => 'Hi! How can we help?',
                'offline_message' => 'We are currently offline. Leave a message!',
                'show_company_logo' => true,
                'show_agent_photos' => true,
                'show_typing_indicator' => true,
                'enable_file_upload' => true,
                'enable_emoji' => true,
                'enable_sound_notifications' => true,
                'auto_assign_chats' => true,
            ]);
        }

        // Check if any agents are online
        $agentsOnline = $company->staff()->where('online_status', 'online')->count();

        return response()->json([
            'company' => [
                'id' => $company->id,
                'uuid' => $company->uuid,
                'name' => $company->name,
                'logo' => $company->logo,
            ],
            'settings' => $settings,
            'is_online' => $agentsOnline > 0,
        ]);
    }

    public function trackVisitor(Request $request, $companyUuid)
    {
        $request->validate([
            'visitor_uuid' => 'required|string',
            'name' => 'nullable|string',
            'email' => 'nullable|email',
            'phone' => 'nullable|string',
            'current_page' => 'nullable|string',
            'referrer' => 'nullable|string',
            'user_agent' => 'nullable|string',
        ]);

        $company = Company::where('uuid', $companyUuid)->firstOrFail();

        $visitor = Visitor::updateOrCreate(
            [
                'company_id' => $company->id,
                'visitor_uuid' => $request->visitor_uuid,
            ],
            [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'ip_address' => $request->ip(),
                'current_page' => $request->current_page,
                'referrer' => $request->referrer,
                'last_activity_at' => now(),
            ]
        );

        // Parse user agent (simplified)
        $userAgent = $request->user_agent ?? $request->header('User-Agent');
        if ($userAgent) {
            $visitor->update([
                'device' => $this->getDeviceType($userAgent),
                'browser' => $this->getBrowser($userAgent),
                'os' => $this->getOS($userAgent),
            ]);
        }

        // Broadcast visitor online
        broadcast(new VisitorOnline($visitor));

        return response()->json(['visitor' => $visitor]);
    }

    public function startConversation(Request $request, $companyUuid)
    {
        $request->validate([
            'visitor_uuid' => 'required|string',
            'message' => 'required|string',
        ]);

        $company = Company::where('uuid', $companyUuid)->firstOrFail();

        $visitor = Visitor::where('company_id', $company->id)
            ->where('visitor_uuid', $request->visitor_uuid)
            ->firstOrFail();

        // Check for existing active conversation
        $conversation = ChatConversation::where('company_id', $company->id)
            ->where('visitor_id', $visitor->id)
            ->whereIn('status', ['active', 'waiting'])
            ->first();

        if (!$conversation) {
            $conversation = ChatConversation::create([
                'company_id' => $company->id,
                'conversation_uuid' => Str::uuid(),
                'visitor_id' => $visitor->id,
                'status' => 'waiting',
                'started_at' => now(),
            ]);

            // Auto-assign if enabled
            $settings = ChatWidgetSetting::where('company_id', $company->id)->first();
            if ($settings && $settings->auto_assign_chats) {
                $this->autoAssignConversation($conversation);
            }
        }

        // Create message
        $message = ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender_type' => Visitor::class,
            'sender_id' => $visitor->id,
            'message' => $request->message,
            'message_type' => 'text',
        ]);

        $message->load('sender');

        // Broadcast the message
        broadcast(new MessageSent($message));

        // Process chatbot automated response
        $chatbotService = app(ChatbotService::class);
        $botResponse = $chatbotService->processMessage($message, $conversation);

        return response()->json([
            'conversation' => $conversation,
            'message' => $message,
            'bot_response' => $botResponse,
        ]);
    }

    public function getMessages($companyUuid, $conversationUuid)
    {
        $company = Company::where('uuid', $companyUuid)->firstOrFail();

        $conversation = ChatConversation::where('company_id', $company->id)
            ->where('conversation_uuid', $conversationUuid)
            ->with(['messages.sender'])
            ->firstOrFail();

        return response()->json([
            'conversation' => $conversation,
            'messages' => $conversation->messages()->with('sender')->latest()->limit(50)->get()->reverse()->values(),
        ]);
    }

    public function sendMessage(Request $request, $companyUuid, $conversationUuid)
    {
        $request->validate([
            'visitor_uuid' => 'required|string',
            'message' => 'required|string|max:5000',
        ]);

        $company = Company::where('uuid', $companyUuid)->firstOrFail();

        $conversation = ChatConversation::where('company_id', $company->id)
            ->where('conversation_uuid', $conversationUuid)
            ->firstOrFail();

        $visitor = Visitor::where('company_id', $company->id)
            ->where('visitor_uuid', $request->visitor_uuid)
            ->firstOrFail();

        $message = ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender_type' => Visitor::class,
            'sender_id' => $visitor->id,
            'message' => $request->message,
            'message_type' => 'text',
        ]);

        $message->load('sender');

        // Broadcast the message
        broadcast(new MessageSent($message));

        // Process chatbot automated response
        $chatbotService = app(ChatbotService::class);
        $botResponse = $chatbotService->processMessage($message, $conversation);

        return response()->json([
            'message' => $message,
            'bot_response' => $botResponse,
        ]);
    }

    private function autoAssignConversation($conversation)
    {
        // Find available agent with least active chats
        $agent = $conversation->company->staff()
            ->where('online_status', 'online')
            ->where('is_active', true)
            ->whereRaw('active_chats < max_concurrent_chats')
            ->orderBy('active_chats', 'asc')
            ->first();

        if ($agent) {
            $conversation->update([
                'assigned_to' => $agent->id,
                'status' => 'active',
            ]);

            $agent->increment('active_chats');
        }
    }

    private function getDeviceType($userAgent)
    {
        if (preg_match('/mobile/i', $userAgent)) {
            return 'Mobile';
        } elseif (preg_match('/tablet/i', $userAgent)) {
            return 'Tablet';
        }
        return 'Desktop';
    }

    private function getBrowser($userAgent)
    {
        if (preg_match('/Chrome/i', $userAgent)) {
            return 'Chrome';
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            return 'Firefox';
        } elseif (preg_match('/Safari/i', $userAgent)) {
            return 'Safari';
        } elseif (preg_match('/Edge/i', $userAgent)) {
            return 'Edge';
        }
        return 'Other';
    }

    private function getOS($userAgent)
    {
        if (preg_match('/Windows/i', $userAgent)) {
            return 'Windows';
        } elseif (preg_match('/Mac/i', $userAgent)) {
            return 'macOS';
        } elseif (preg_match('/Linux/i', $userAgent)) {
            return 'Linux';
        } elseif (preg_match('/Android/i', $userAgent)) {
            return 'Android';
        } elseif (preg_match('/iOS|iPhone|iPad/i', $userAgent)) {
            return 'iOS';
        }
        return 'Other';
    }
}
