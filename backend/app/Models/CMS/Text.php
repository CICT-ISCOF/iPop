<?php

namespace App\Models\CMS;

class Text extends Sluggable
{
    protected $fillable = ['title', 'body', 'link_id'];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
