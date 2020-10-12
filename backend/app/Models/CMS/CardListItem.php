<?php

namespace App\Models\CMS;

use App\Models\File;

class CardListItem extends Sluggable
{
    protected $fillable = ['title', 'description', 'card_list_id', 'file_id'];
    protected $with = ['file'];

    protected static function booted()
    {
        static::deleting(function ($item) {
            $item->file->delete();
        });
    }

    public function card()
    {
        return $this->belongsTo(CardList::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
