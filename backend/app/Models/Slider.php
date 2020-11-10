<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use HasFactory;

    protected $fillable = ['photo_id'];
    protected $with = ['photo'];

    public static function booted()
    {
        static::deleted(function ($slider) {
            $slider->photo->delete();
        });
    }

    public function photo()
    {
        return $this->belongsTo(File::class);
    }
}
