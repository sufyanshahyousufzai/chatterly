<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'document_name', 'category', 'file_path', 'file_type', 'file_size',
        'document_for_type', 'document_for_id', 'expiry_date', 'reminder_days', 'uploaded_by',
    ];

    protected function casts(): array
    {
        return ['expiry_date' => 'date'];
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function documentFor(): MorphTo { return $this->morphTo(); }
}