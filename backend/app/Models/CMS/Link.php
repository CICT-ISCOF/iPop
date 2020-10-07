<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'sub_categories'];

    protected static function booted()
    {
        static::deleting(function ($link) {
            $link->cardLists->delete();
            $link->gridLists->delete();
            $link->linkLists->delete();
            $link->sliderLists->delete();
            $link->articles->delete();
            $link->medias->delete();
            $link->texts->delete();
        });
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }

    public function cards()
    {
        return $this->hasManyThrough(CardListItem::class, CardList::class);
    }

    public function grids()
    {
        return $this->hasManyThrough(GridListItem::class, GridList::class);
    }

    public function lists()
    {
        return $this->hasMany(LinkList::class);
    }

    public function medias()
    {
        return $this->hasMany(Media::class);
    }

    public function sliders()
    {
        return $this->hasManyThrough(SliderListItem::class, SliderList::class);
    }

    public function texts()
    {
        return $this->hasMany(Text::class);
    }

    /**
     * For relationship saving purposes.
     */

    public function cardLists()
    {
        return $this->hasMany(CardList::class);
    }

    public function gridLists()
    {
        return $this->hasMany(GridList::class);
    }

    public function sliderLists()
    {
        return $this->hasMany(SliderList::class);
    }
}
