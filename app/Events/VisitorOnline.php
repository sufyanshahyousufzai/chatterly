<?php

namespace App\Events;

use App\Models\Visitor;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VisitorOnline implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Visitor $visitor
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('visitors.' . $this->visitor->company_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'visitor.online';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->visitor->id,
            'visitor_id' => $this->visitor->visitor_id,
            'name' => $this->visitor->name,
            'email' => $this->visitor->email,
            'current_page' => $this->visitor->current_page,
            'country' => $this->visitor->country,
            'city' => $this->visitor->city,
            'browser' => $this->visitor->browser,
            'device' => $this->visitor->device,
            'last_activity_at' => $this->visitor->last_activity_at,
        ];
    }
}
