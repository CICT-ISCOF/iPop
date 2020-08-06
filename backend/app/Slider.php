<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = ['link_id'];

    public function getFileIdsAttribute()
    {
        return isset($this->attributes['file_ids'])
            ? json_decode($this->attributes['file_ids'])
            : null;
    }

    public function setFileIdsAttribute($value)
    {
        $this->attributes['file_ids'] = isset($value)
            ? json_encode($value)
            : null;
    }
}
