<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanySettings extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'setting_key', 'setting_value'];

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
}