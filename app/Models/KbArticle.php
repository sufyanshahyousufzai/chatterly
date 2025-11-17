<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class KbArticle extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'category_id', 'title', 'slug', 'content', 'excerpt',
        'is_public', 'is_published', 'views', 'helpful_count', 'not_helpful_count',
        'author_id', 'published_at',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',
            'is_published' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($article) {
            if (empty($article->slug)) {
                $article->slug = Str::slug($article->title);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function category(): BelongsTo { return $this->belongsTo(KbCategory::class, 'category_id'); }
    public function author(): BelongsTo { return $this->belongsTo(Staff::class, 'author_id'); }
    public function ratings(): HasMany { return $this->hasMany(KbArticleRating::class, 'article_id'); }
}