<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body'];
    protected $with = ['photos'];

    protected static function booted()
    {
        static::saving(function ($article) {
            $article->slug = Str::slug($article->title);
        });

        static::deleting(function ($article) {
            $article->photos->each(function ($photo) {
                $photo->delete();
            });
        });
    }

    public function photos()
    {
        return $this->hasMany(ArticlePhoto::class);
    }
}
