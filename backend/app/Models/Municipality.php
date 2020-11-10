<?php

namespace App\Models;

class Municipality extends ReadOnly
{
    public function region()
    {
        return $this->belongsTo(Region::class, 'code', 'region_code');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'code', 'province_code');
    }

    public function barangays()
    {
        return $this->hasMany(Barangay::class, 'municipality_code', 'code');
    }
}
