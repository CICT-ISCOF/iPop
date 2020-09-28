<?php

namespace App\Models;

class Record extends Model
{
    protected $fillable = ['status', 'user_id'];

    public function recordable()
    {
        return $this->morphTo();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
