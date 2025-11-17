<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'name', 'description', 'form_type', 'form_fields', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'form_fields' => 'array',
            'is_active' => 'boolean',
        ];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function submissions(): HasMany { return $this->hasMany(CustomFormSubmission::class, 'form_id'); }
}