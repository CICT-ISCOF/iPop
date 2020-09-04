<?php

namespace App;

class Province extends ReadOnly
{
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_code', 'code');
    }

    public function municipalities()
    {
        return $this->hasMany(Municipality::class, 'province_code', 'code');
    }

    public function barangays()
    {
        return $this->hasMany(Barangay::class, 'province_code', 'code');
    }
}
