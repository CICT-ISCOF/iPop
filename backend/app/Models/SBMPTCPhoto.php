<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SBMPTCPhoto extends Model
{
    use HasFactory;

    protected $fillable = ['sbmptc_id', 'photo_id'];
    protected $with = ['photo'];

    public static function booted()
    {
        static::deleted(function ($file) {
            $file->photo->delete();
        });
    }

    public function sbmptc()
    {
        return $this->belongsTo(SBMPTC::class, 'sbmptc_id');
    }

    public function photo()
    {
        return $this->belongsTo(File::class, 'photo_id');
    }
}
