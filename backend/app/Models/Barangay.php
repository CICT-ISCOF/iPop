<?php

namespace App\Models;

class Barangay extends ReadOnly
{
    public function region()
    {
        return $this->belongsTo(Region::class, 'region_code', 'code');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_code', 'code');
    }

    public function municipality()
    {
        return $this->belongsTo(
            Municipality::class,
            'code',
            'municipality_code'
        );
    }
}
