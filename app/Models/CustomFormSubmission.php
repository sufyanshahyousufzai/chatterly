<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CustomFormSubmission extends Model
{
    use HasFactory;

    protected $fillable = ['form_id', 'client_id', 'visitor_id', 'form_data', 'ip_address'];

    protected function casts(): array
    {
        return ['form_data' => 'array'];
    }

    public function form(): BelongsTo { return $this->belongsTo(CustomForm::class, 'form_id'); }
    public function client(): BelongsTo { return $this->belongsTo(Client::class); }
    public function visitor(): BelongsTo { return $this->belongsTo(Visitor::class); }
}