<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Death extends Model
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
        'age_at_death',
        'age_bracket',
        'place_of_death',
        'registered_lcr',
    ];
}
