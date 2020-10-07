<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'link_id', 'file_id'];
    protected $with = ['file'];

    protected static function booted()
    {
        static::deleting(function($article) {
            $article->file->delete();
        });
    }

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    public function file()
    {
        return $this->hasOne(File::class);
    }
}
