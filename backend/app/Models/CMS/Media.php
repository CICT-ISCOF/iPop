<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;
    
    protected $fillable = ['link_id', 'file_id'];
    protected $with = ['file'];

    protected static function booted()
    {
        static::deleting(function($media) {
            $media->file->delete();
        });
    }

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
