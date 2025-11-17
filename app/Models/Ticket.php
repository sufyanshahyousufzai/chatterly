<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'ticket_number', 'subject', 'description', 'client_id', 'visitor_id',
        'assigned_to', 'priority', 'status', 'category', 'source', 'conversation_id',
        'rating', 'feedback', 'due_date', 'solved_at', 'closed_at',
    ];

    protected function casts(): array
    {
        return [
            'due_date' => 'datetime',
            'solved_at' => 'datetime',
            'closed_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($ticket) {
            if (empty($ticket->ticket_number)) {
                $lastTicket = self::where('company_id', $ticket->company_id)
                    ->orderBy('id', 'desc')
                    ->first();
                $number = $lastTicket ? intval(substr($lastTicket->ticket_number, 4)) + 1 : 1;
                $ticket->ticket_number = 'TICK' . str_pad($number, 3, '0', STR_PAD_LEFT);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function client(): BelongsTo { return $this->belongsTo(Client::class); }
    public function visitor(): BelongsTo { return $this->belongsTo(Visitor::class); }
    public function assignedAgent(): BelongsTo { return $this->belongsTo(Staff::class, 'assigned_to'); }
    public function conversation(): BelongsTo { return $this->belongsTo(ChatConversation::class); }
    public function replies(): HasMany { return $this->hasMany(TicketReply::class); }
}