<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Municipality extends Model
{
    protected $fillable = ['name', 'city', 'latitude', 'longitude'];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function barangays()
    {
        return $this->hasMany(Barangay::class);
    }

    public function populations()
    {
        return $this->morphMany(Population::class);
    }
}
