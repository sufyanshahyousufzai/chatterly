<?php

namespace App\Events;

use App\Models\Staff;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class StaffStatusChanged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(
        public Staff $staff,
        public string $previousStatus
    ) {}

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('company.' . $this->staff->company_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'staff.status.changed';
    }

    public function broadcastWith(): array
    {
        return [
            'staff_id' => $this->staff->id,
            'name' => $this->staff->name,
            'previous_status' => $this->previousStatus,
            'current_status' => $this->staff->online_status,
        ];
    }
}
