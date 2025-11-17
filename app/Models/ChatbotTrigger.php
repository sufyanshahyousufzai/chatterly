<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatbotTrigger extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'name', 'trigger_type', 'keywords', 'url_pattern', 'time_seconds',
        'page_visit_count', 'response_type', 'response_message', 'quick_replies', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'keywords' => 'array',
            'quick_replies' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
}