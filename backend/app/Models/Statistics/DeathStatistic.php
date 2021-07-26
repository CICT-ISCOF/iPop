<?php

namespace App\Models\Statistics;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeathStatistic extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'population',
        'crude_death_rate',
        'total',
    ];

    protected $appends = ['profile'];

    public function getProfileAttribute()
    {
        return Profile::getApproved()
            ->where('year', $this->year)
            ->where('barangay', $this->barangay)
            ->where('municipality', $this->municipality)
            ->first();
    }
}
