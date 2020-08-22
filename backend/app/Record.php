<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Record extends Model
{
    protected $fillable = ['status', 'user_id'];

    public function recordable()
    {
        return $this->morphTo();
    }
}
