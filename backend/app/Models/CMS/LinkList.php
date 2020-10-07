<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LinkList extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'link_id'];

    protected static function booted()
    {
        static::deleting(function($list) {
            $list->items->delete();
        });
    }

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    public function items()
    {
        return $this->hasMany(ListItem::class);
    }
}
