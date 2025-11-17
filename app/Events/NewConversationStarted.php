<?php

namespace App\Events;

use App\Models\ChatConversation;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewConversationStarted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public ChatConversation $conversation
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('active-chats.' . $this->conversation->company_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'conversation.started';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->conversation->id,
            'visitor_id' => $this->conversation->visitor_id,
            'client_id' => $this->conversation->client_id,
            'assigned_to_id' => $this->conversation->assigned_to_id,
            'status' => $this->conversation->status,
            'created_at' => $this->conversation->created_at,
            'visitor' => $this->conversation->visitor ? [
                'id' => $this->conversation->visitor->id,
                'name' => $this->conversation->visitor->name,
                'email' => $this->conversation->visitor->email,
            ] : null,
        ];
    }
}
