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
        'total_population',
        'total_live_births',
        'crude_birth_rate',
        'teenage_births',
        'illegitimate_births',
        'general_fertility_rate',
    ];

    protected $appends = ['profile', 'total'];

    public function getProfileAttribute()
    {
        return Profile::getApproved()
            ->where('year', $this->year)
            ->where('barangay', $this->barangay)
            ->where('municipality', $this->municipality)
            ->first();
    }

    public function getTotalAttribute()
    {
        if (!$this->profile) {
            return 0;
        }
        return $this->profile->males + $this->profile->females;
    }
}
