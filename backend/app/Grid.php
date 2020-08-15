<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grid extends Model
{
    protected $fillable = ['title', 'link_id', 'position'];

    protected static function booted()
    {
        static::deleted(function ($grid) {
            $grid->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
