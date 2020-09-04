<?php

namespace App;

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
            'municipality_code',
            'code'
        );
    }
}
