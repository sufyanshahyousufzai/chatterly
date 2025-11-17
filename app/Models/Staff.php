<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Permission\Traits\HasRoles;

class Staff extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $table = 'staff';
    protected $guard_name = 'staff';

    protected $fillable = [
        'company_id', 'staff_id', 'name', 'email', 'password', 'avatar', 'phone',
        'date_of_birth', 'gender', 'designation', 'department', 'joining_date',
        'online_status', 'last_seen_at', 'max_concurrent_chats', 'is_active', 'last_login_at',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'joining_date' => 'date',
            'last_seen_at' => 'datetime',
            'last_login_at' => 'datetime',
            'is_active' => 'boolean',
            'password' => 'hashed',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($staff) {
            if (empty($staff->staff_id)) {
                $lastStaff = self::where('company_id', $staff->company_id)
                    ->orderBy('id', 'desc')
                    ->first();
                $number = $lastStaff ? intval(substr($lastStaff->staff_id, 3)) + 1 : 1;
                $staff->staff_id = 'EMP' . str_pad($number, 3, '0', STR_PAD_LEFT);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function assignedConversations(): HasMany { return $this->hasMany(ChatConversation::class, 'assigned_to'); }
    public function assignedTickets(): HasMany { return $this->hasMany(Ticket::class, 'assigned_to'); }
    public function attendance(): HasMany { return $this->hasMany(StaffAttendance::class); }
    public function leaveRequests(): HasMany { return $this->hasMany(LeaveRequest::class); }
    public function performance(): HasMany { return $this->hasMany(StaffPerformance::class); }

    public function isOnline(): bool { return $this->online_status === 'online'; }
}