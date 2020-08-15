<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Birth extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'total_cases',
        'number_of_cases',
        'household_number',
        'month',
        'name',
        'sex',
        'birth_order',
        'place_of_birth',
        'name_of_mother',
        'age_of_mother',
        'age_bracket_of_mother',
        'occupation_of_mother',
        'religion',
        'mother_marital_status',
        'registered_lcr',
    ];
}
