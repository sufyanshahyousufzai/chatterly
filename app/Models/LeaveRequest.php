<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'leave_number', 'staff_id', 'leave_type_id', 'from_date', 'to_date',
        'total_days', 'reason', 'status', 'approved_by', 'approved_at',
    ];

    protected function casts(): array
    {
        return [
            'from_date' => 'date',
            'to_date' => 'date',
            'total_days' => 'decimal:2',
            'approved_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($leave) {
            if (empty($leave->leave_number)) {
                $lastLeave = self::where('company_id', $leave->company_id)
                    ->orderBy('id', 'desc')
                    ->first();
                $number = $lastLeave ? intval(substr($lastLeave->leave_number, 3)) + 1 : 1;
                $leave->leave_number = 'LVE' . str_pad($number, 3, '0', STR_PAD_LEFT);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function staff(): BelongsTo { return $this->belongsTo(Staff::class); }
    public function leaveType(): BelongsTo { return $this->belongsTo(LeaveType::class); }
}