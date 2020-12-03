<?php

namespace App\Models\Statistics;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'coverage',
        'barangays',
        'land_area',
        'household_population',
        'males',
        'females',
        'sex_ratio',
        'median_age',
        'doubling',
        'growth_rate',
        'households',
        'average_household_size',
        'density',
        'age_dependency_ratio',
        'child_dependency_ratio',
        'old_age_dependency_ratio',
    ];
}
