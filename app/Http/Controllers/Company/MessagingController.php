<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\MessagingChannel;
use App\Models\MessagingTemplate;
use App\Models\SmsLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class MessagingController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;

        $channels = MessagingChannel::where('company_id', $company->id)->get();
        $templates = MessagingTemplate::where('company_id', $company->id)->get();

        // SMS Statistics
        $smsStats = [
            'total_sent' => SmsLog::where('company_id', $company->id)->count(),
            'delivered' => SmsLog::where('company_id', $company->id)->where('status', 'delivered')->count(),
            'failed' => SmsLog::where('company_id', $company->id)->where('status', 'failed')->count(),
            'pending' => SmsLog::where('company_id', $company->id)->where('status', 'pending')->count(),
        ];

        return Inertia::render('company/Messaging', [
            'channels' => $channels,
            'templates' => $templates,
            'smsStats' => $smsStats,
        ]);
    }

    public function updateChannel(Request $request, $id)
    {
        $company = auth()->guard('company')->user()->company;
        $channel = MessagingChannel::where('company_id', $company->id)->findOrFail($id);

        $request->validate([
            'is_active' => 'required|boolean',
            'credentials' => 'nullable|array',
        ]);

        $channel->update([
            'is_active' => $request->is_active,
            'credentials' => $request->credentials ?? $channel->credentials,
        ]);

        return redirect()->back()->with('success', 'Channel updated successfully');
    }

    public function storeTemplate(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'name' => 'required|string|max:255',
            'channel_type' => 'required|in:sms,whatsapp',
            'template_text' => 'required|string|max:1000',
            'variables' => 'nullable|array',
        ]);

        MessagingTemplate::create([
            'company_id' => $company->id,
            'name' => $request->name,
            'channel_type' => $request->channel_type,
            'template_text' => $request->template_text,
            'variables' => $request->variables ?? [],
            'is_active' => true,
        ]);

        return redirect()->back()->with('success', 'Template created successfully');
    }

    public function sendMessage(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'channel_type' => 'required|in:sms,whatsapp',
            'recipient' => 'required|string',
            'message' => 'required|string|max:1000',
            'template_id' => 'nullable|exists:messaging_templates,id',
        ]);

        DB::beginTransaction();
        try {
            $channel = MessagingChannel::where('company_id', $company->id)
                ->where('channel_type', $request->channel_type)
                ->where('is_active', true)
                ->first();

            if (!$channel) {
                return response()->json([
                    'error' => 'Channel not configured or inactive',
                ], 400);
            }

            // Create SMS log
            $log = SmsLog::create([
                'company_id' => $company->id,
                'channel_type' => $request->channel_type,
                'recipient' => $request->recipient,
                'message' => $request->message,
                'status' => 'pending',
                'sent_at' => now(),
            ]);

            // Here you would integrate with actual SMS/WhatsApp providers
            // For now, we'll just mark as sent
            $this->sendViaTwilio($channel, $request->recipient, $request->message);

            $log->update(['status' => 'sent']);

            DB::commit();

            return response()->json([
                'message' => 'Message sent successfully',
                'log_id' => $log->id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to send message: ' . $e->getMessage(),
            ], 500);
        }
    }

    private function sendViaTwilio($channel, $recipient, $message)
    {
        // Integration with Twilio API
        // This is a placeholder - implement actual Twilio integration
        // using credentials from $channel->credentials

        /*
        $twilio = new \Twilio\Rest\Client(
            $channel->credentials['account_sid'],
            $channel->credentials['auth_token']
        );

        $twilio->messages->create($recipient, [
            'from' => $channel->credentials['from_number'],
            'body' => $message
        ]);
        */

        return true;
    }

    private function sendViaWhatsApp($channel, $recipient, $message)
    {
        // Integration with WhatsApp Business API
        // This is a placeholder - implement actual WhatsApp integration

        return true;
    }

    public function logs(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $logs = SmsLog::where('company_id', $company->id)
            ->when($request->channel_type, function ($query, $type) {
                $query->where('channel_type', $type);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest('sent_at')
            ->paginate(50);

        return response()->json([
            'logs' => $logs,
        ]);
    }
}
