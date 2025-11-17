<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatbotTrigger extends Model
{
    protected $fillable = [
        'company_id',
        'name',
        'trigger_type',
        'keywords',
        'url_pattern',
        'time_seconds',
        'page_visit_count',
        'response_type',
        'response_message',
        'quick_replies',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'keywords' => 'array',
        'quick_replies' => 'array',
        'is_active' => 'boolean',
        'time_seconds' => 'integer',
        'page_visit_count' => 'integer',
        'sort_order' => 'integer',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Check if trigger matches the given message
     */
    public function matchesMessage(string $message): bool
    {
        if ($this->trigger_type !== 'keyword' || !$this->keywords) {
            return false;
        }

        $messageLower = strtolower($message);

        foreach ($this->keywords as $keyword) {
            if (str_contains($messageLower, strtolower($keyword))) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check if trigger matches the given URL
     */
    public function matchesUrl(string $url): bool
    {
        if ($this->trigger_type !== 'url' || !$this->url_pattern) {
            return false;
        }

        return str_contains($url, $this->url_pattern);
    }
}
