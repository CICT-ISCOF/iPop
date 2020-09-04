<?php

namespace App;

class Region extends ReadOnly
{
    public function provinces()
    {
        return $this->hasMany(Province::class, 'region_code', 'code');
    }

    public function municipalities()
    {
        return $this->hasMany(Municipality::class, 'region_code', 'code');
    }

    public function barangays()
    {
        return $this->hasMany(Barangay::class, 'region_code', 'code');
    }
}
