<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KbArticleRating extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['article_id', 'is_helpful', 'feedback', 'ip_address'];

    protected function casts(): array
    {
        return [
            'is_helpful' => 'boolean',
            'created_at' => 'datetime',
        ];
    }

    public function article(): BelongsTo { return $this->belongsTo(KbArticle::class); }
}