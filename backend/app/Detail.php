<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'address',
        'birthday',
        'occupation',
        'user_id',
    ];

    protected $dates = ['birthday'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
