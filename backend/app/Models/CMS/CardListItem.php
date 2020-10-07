<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardListItem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'card_list_id', 'file_id'];
    protected $with = ['file'];

    protected static function booted()
    {
        static::deleting(function($item) {
            $item->file->delete();
        });
    }

    public function card()
    {
        return $this->belongsTo(CardList::class);
    }

    public function file()
    {
        return $this->hasOne(File::class);
    }
}
