<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    protected $appends = ['slug'];

    public function getBlockedAttribute()
    {
        return Str::slug($this->title);
    }
}
