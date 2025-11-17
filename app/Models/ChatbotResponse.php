<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatbotResponse extends Model
{
    protected $fillable = [
        'company_id',
        'keyword',
        'response',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Check if this response matches the given message
     */
    public function matches(string $message): bool
    {
        return str_contains(strtolower($message), strtolower($this->keyword));
    }
}
