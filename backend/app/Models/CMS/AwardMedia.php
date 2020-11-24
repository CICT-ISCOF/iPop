<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AwardMedia extends Model
{
    use HasFactory;

    protected $fillable = ['award_id', 'file_id'];
    protected $with = ['file'];

    public static function booted()
    {
        static::deleted(function ($media) {
            $media->file->delete();
        });
    }

    public function award()
    {
        return $this->belongsTo(Award::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
