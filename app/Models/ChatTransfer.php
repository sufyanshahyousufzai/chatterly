<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatTransfer extends Model
{
    use HasFactory;

    protected $fillable = ['conversation_id', 'from_staff_id', 'to_staff_id', 'reason'];

    public function conversation(): BelongsTo { return $this->belongsTo(ChatConversation::class); }
    public function fromStaff(): BelongsTo { return $this->belongsTo(Staff::class, 'from_staff_id'); }
    public function toStaff(): BelongsTo { return $this->belongsTo(Staff::class, 'to_staff_id'); }
}