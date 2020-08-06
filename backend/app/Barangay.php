<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Barangay extends Model
{
    protected $fillable = ['name', 'latitude', 'longitude', 'municipality_id'];

    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function municipality()
    {
        return $this->belongsTo(Municipality::class);
    }

    public function populations()
    {
        return $this->morphMany(Population::class, 'stateable');
    }
}
