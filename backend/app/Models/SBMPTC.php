<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SBMPTC extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'tc_coordinator_count',
        'population',
        'services',
    ];

    public function members()
    {
        return $this->hasMany(MTCMMembers::class, 'sbmptc_id');
    }

    public function photos()
    {
        return $this->hasMany(SBMPTCPhoto::class)
    }
}
