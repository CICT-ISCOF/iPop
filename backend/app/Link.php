<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Casts\LinkJSON;

class Link extends Model
{
    protected $fillable = ['title', 'url'];

    protected $casts = [
        'has_children' => 'boolean',
    ];

    public function getChildrenAttribute()
    {
        return $this->attributes['children']
            ? json_decode($this->attributes['children'])
            : null;
    }

    public function setChildrenAttribute($value)
    {
        $this->attributes['children'] = json_encode($value);
    }
}
