<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OutMigration extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'total_cases',
        'case_number',
        'month',
        'name',
        'sex',
        'date_of_birth',
        'age',
        'age_in_months',
        'age_bracket',
        'completed_educational_attainment',
        'actual_occupation',
        'major_occupation',
        'monthly_income',
        'skills_acquired',
        'actual_place_of_origin',
        'place_of_origin',
        'reasons_for_out_migrating',
    ];
}
