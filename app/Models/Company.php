<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid', 'name', 'slug', 'logo', 'domain', 'email', 'phone', 'address',
        'city', 'state', 'country', 'postal_code', 'website', 'timezone', 'currency',
        'subscription_plan_id', 'subscription_status', 'trial_ends_at',
        'subscription_ends_at', 'stripe_customer_id', 'is_active', 'owner_id',
    ];

    protected function casts(): array
    {
        return [
            'trial_ends_at' => 'datetime',
            'subscription_ends_at' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($company) {
            if (empty($company->uuid)) {
                $company->uuid = Str::uuid();
            }
            if (empty($company->slug)) {
                $company->slug = Str::slug($company->name);
            }
        });
    }

    public function subscriptionPlan(): BelongsTo { return $this->belongsTo(SubscriptionPlan::class); }
    public function owner(): BelongsTo { return $this->belongsTo(CompanyUser::class, 'owner_id'); }
    public function companyUsers(): HasMany { return $this->hasMany(CompanyUser::class); }
    public function staff(): HasMany { return $this->hasMany(Staff::class); }
    public function clients(): HasMany { return $this->hasMany(Client::class); }
    public function visitors(): HasMany { return $this->hasMany(Visitor::class); }
    public function chatConversations(): HasMany { return $this->hasMany(ChatConversation::class); }
    public function tickets(): HasMany { return $this->hasMany(Ticket::class); }
    public function chatWidgetSettings(): HasOne { return $this->hasOne(ChatWidgetSettings::class); }
    public function kbCategories(): HasMany { return $this->hasMany(KbCategory::class); }
    public function subscriptions(): HasMany { return $this->hasMany(Subscription::class); }
    public function customForms(): HasMany { return $this->hasMany(CustomForm::class); }
    public function documents(): HasMany { return $this->hasMany(Document::class); }
    public function assets(): HasMany { return $this->hasMany(Asset::class); }
    public function leaveTypes(): HasMany { return $this->hasMany(LeaveType::class); }
    public function chatAnalytics(): HasMany { return $this->hasMany(ChatAnalytics::class); }
    public function invoices(): HasMany { return $this->hasMany(Invoice::class); }
    public function activityLogs(): HasMany { return $this->hasMany(ActivityLog::class); }
    public function companySettings(): HasMany { return $this->hasMany(CompanySettings::class); }

    public function isActive(): bool { return $this->is_active && $this->subscription_status === 'active'; }
    public function isOnTrial(): bool { return $this->subscription_status === 'trial' && $this->trial_ends_at && $this->trial_ends_at->isFuture(); }
}