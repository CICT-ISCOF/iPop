<?php

namespace App\Models\Statistics;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BirthStatistic extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'gender',
        'total_live_births',
        'crude_birth_rate',
        'general_fertility_rate',
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
