<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticlePhoto extends Model
{
    use HasFactory;

    protected $fillable = ['article_id', 'file_id'];
    protected $with = ['file'];

    public static function booted()
    {
        static::deleted(function ($photo) {
            $photo->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
