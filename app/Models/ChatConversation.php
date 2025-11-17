<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class ChatConversation extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'conversation_uuid', 'visitor_id', 'client_id', 'assigned_to',
        'status', 'rating', 'feedback', 'started_at', 'ended_at',
    ];

    protected function casts(): array
    {
        return [
            'started_at' => 'datetime',
            'ended_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($conversation) {
            if (empty($conversation->conversation_uuid)) {
                $conversation->conversation_uuid = Str::uuid();
            }
            if (empty($conversation->started_at)) {
                $conversation->started_at = now();
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function visitor(): BelongsTo { return $this->belongsTo(Visitor::class); }
    public function client(): BelongsTo { return $this->belongsTo(Client::class); }
    public function assignedAgent(): BelongsTo { return $this->belongsTo(Staff::class, 'assigned_to'); }
    public function messages(): HasMany { return $this->hasMany(ChatMessage::class, 'conversation_id'); }
    public function transfers(): HasMany { return $this->hasMany(ChatTransfer::class, 'conversation_id'); }
}