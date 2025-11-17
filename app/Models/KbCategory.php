<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class KbCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id', 'name', 'slug', 'description', 'icon', 'is_public', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['is_public' => 'boolean'];
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }

    public function company(): BelongsTo { return $this->belongsTo(Company::class); }
    public function articles(): HasMany { return $this->hasMany(KbArticle::class, 'category_id'); }
}