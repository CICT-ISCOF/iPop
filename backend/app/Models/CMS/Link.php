<?php

namespace App\Models\CMS;

class Link extends Sluggable
{
    protected $fillable = ['title', 'parent_id'];
    protected $with = ['children'];
    protected $appends = ['has_parent'];

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

    public function getHasParentAttribute()
    {
        return isset($this->attributes['parent_id']) && $this->attributes['parent_id'] !== null;
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
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
