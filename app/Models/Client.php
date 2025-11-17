<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $guard_name = 'client';

    protected $fillable = [
        'company_id', 'client_id', 'name', 'email', 'password', 'phone', 'avatar',
        'company_name', 'address', 'city', 'state', 'country', 'postal_code',
        'notes', 'tags', 'portal_access', 'is_active', 'last_login_at', 'created_by',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'portal_access' => 'boolean',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($client) {
            if (empty($client->client_id)) {
                $lastClient = self::where('company_id', $client->company_id)
                    ->orderBy('id', 'desc')
                    ->first();
                $number = $lastClient ? intval(substr($lastClient->client_id, 3)) + 1 : 1;
                $client->client_id = 'CLI' . str_pad($number, 3, '0', STR_PAD_LEFT);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function conversations(): HasMany { return $this->hasMany(ChatConversation::class); }
    public function tickets(): HasMany { return $this->hasMany(Ticket::class); }
    public function documents(): HasMany { return $this->hasMany(Document::class, 'document_for_id')->where('document_for_type', self::class); }
}