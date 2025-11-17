<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StaffPerformance extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'staff_id', 'date', 'total_chats', 'completed_chats',
        'avg_response_time', 'avg_chat_duration', 'satisfaction_rating',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'satisfaction_rating' => 'decimal:2',
        ];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function staff(): BelongsTo { return $this->belongsTo(Staff::class); }
}