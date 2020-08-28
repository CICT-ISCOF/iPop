<?php
 
namespace App;

use Illuminate\Database\Eloquent\Model;

class Link extends Model
{
    protected $fillable = ['title', 'subcategory', 'slug', 'position'];

    public function cards()
    {
        return $this->hasMany(Card::class);
    }

    public function medias()
    {
        return $this->hasMany(SingleMedia::class);
    }

    public function gridTables()
    {
        return $this->hasMany(GridTable::class);
    }

    public function sliderTables()
    {
        return $this->hasMany(SliderTable::class);
    }

    public function texts()
    {
        return $this->hasMany(Text::class);
    }
}
