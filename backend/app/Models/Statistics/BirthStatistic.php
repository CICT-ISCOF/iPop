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
        'male',
        'female',
        'total_live_births',
        'crude_death_rate',
        'general_fertility_rate',
    ];
}
