<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'asset_id', 'name', 'description', 'category', 'assigned_to_type',
        'assigned_to_id', 'status', 'purchase_date', 'warranty_end',
    ];

    protected function casts(): array
    {
        return [
            'purchase_date' => 'date',
            'warranty_end' => 'date',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($asset) {
            if (empty($asset->asset_id)) {
                $lastAsset = self::where('company_id', $asset->company_id)
                    ->orderBy('id', 'desc')
                    ->first();
                $number = $lastAsset ? intval(substr($lastAsset->asset_id, 3)) + 1 : 1;
                $asset->asset_id = 'AST' . str_pad($number, 3, '0', STR_PAD_LEFT);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function assignedTo(): MorphTo { return $this->morphTo(); }
}