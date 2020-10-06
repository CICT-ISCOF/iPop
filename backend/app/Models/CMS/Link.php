<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'sub_categories'];

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
        return $this->hasManyThrough(ListItem::class, LinkList::class);
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

    public function linkLists()
    {
        return $this->hasMany(LinkList::class);
    }

    public function sliderLists()
    {
        return $this->hasMany(SliderList::class);
    }
}
