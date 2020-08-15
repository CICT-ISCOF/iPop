<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = ['file_id', 'slider_table_id', 'position'];

    protected static function booted()
    {
        static::deleted(function ($slider) {
            $slider->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
