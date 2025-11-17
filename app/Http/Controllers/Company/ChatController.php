<?php

namespace App\Http\Controllers\Company;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;

        $conversations = ChatConversation::with(['visitor', 'client', 'assignedTo'])
            ->where('company_id', $company->id)
            ->latest()
            ->paginate(20);

        return Inertia::render('company/Chat', [
            'conversations' => $conversations,
        ]);
    }

    public function show($id)
    {
        $company = auth()->guard('company')->user()->company;

        $conversation = ChatConversation::with(['visitor', 'client', 'assignedTo', 'messages.sender'])
            ->where('company_id', $company->id)
            ->findOrFail($id);

        return response()->json([
            'conversation' => $conversation,
            'messages' => $conversation->messages()->with('sender')->latest()->limit(50)->get()->reverse()->values(),
        ]);
    }

    public function sendMessage(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string|max:5000',
        ]);

        $company = auth()->guard('company')->user()->company;
        $user = auth()->guard('company')->user();

        $conversation = ChatConversation::where('company_id', $company->id)->findOrFail($id);

        $message = ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender_type' => get_class($user),
            'sender_id' => $user->id,
            'message' => $request->message,
            'message_type' => 'text',
        ]);

        $message->load('sender');

        // Broadcast the message
        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => $message]);
    }

    public function markAsRead($id)
    {
        $company = auth()->guard('company')->user()->company;

        ChatMessage::whereHas('conversation', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->where('conversation_id', $id)
          ->where('is_read', false)
          ->update(['is_read' => true, 'read_at' => now()]);

        return response()->json(['success' => true]);
    }

    public function closeConversation($id)
    {
        $company = auth()->guard('company')->user()->company;

        $conversation = ChatConversation::where('company_id', $company->id)->findOrFail($id);
        $conversation->update(['status' => 'closed', 'ended_at' => now()]);

        return response()->json(['success' => true]);
    }
}
