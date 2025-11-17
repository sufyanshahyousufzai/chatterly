<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'visitor_uuid', 'name', 'email', 'phone', 'ip_address',
        'country', 'city', 'device', 'browser', 'os', 'current_page', 'referrer',
        'is_chatting', 'is_online', 'last_seen_at',
    ];

    protected function casts(): array
    {
        return [
            'is_chatting' => 'boolean',
            'is_online' => 'boolean',
            'last_seen_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($visitor) {
            if (empty($visitor->visitor_uuid)) {
                $visitor->visitor_uuid = Str::uuid();
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function conversations(): HasMany { return $this->hasMany(ChatConversation::class); }
}