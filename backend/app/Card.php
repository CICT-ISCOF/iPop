<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = ['link_id', 'title', 'body', 'position'];

    protected static function booted()
    {
        static::deleted(function ($card) {
            $card->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
