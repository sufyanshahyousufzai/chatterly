<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatAnalytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'date', 'total_chats', 'missed_chats', 'completed_chats',
        'avg_wait_time', 'avg_chat_duration', 'avg_messages_per_chat', 'satisfaction_rating',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'avg_messages_per_chat' => 'decimal:2',
            'satisfaction_rating' => 'decimal:2',
        ];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
}