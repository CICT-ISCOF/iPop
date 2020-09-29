<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;

abstract class Model extends BaseModel
{
    use SoftDeletes,
        Searchable;

    protected $hidden = ['deleted_at'];

    public function getFillable()
    {
        return $this->fillable;
    }

    public function toSearchableArray()
    {
        return $this->toArray();
    }
}