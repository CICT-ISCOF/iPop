<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class Sluggable extends Model
{
    use HasFactory;

    protected $appends = ['slug'];

    public function getSlugAttribute()
    {
        return Str::slug($this->title);
    }
}
