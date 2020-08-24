<?php

namespace App;

use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\SoftDeletes;

abstract class Model extends BaseModel
{
    use SoftDeletes;
    protected $hidden = ['deleted_at'];

    public function getFillable()
    {
        return $this->fillable;
    }
}
