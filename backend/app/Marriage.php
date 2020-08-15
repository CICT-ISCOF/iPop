<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marriage extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'total_cases',
        'household_number',
        'case_number',
        'month',
        'couple_name',
        'sex',
        'age_bracket',
        'address',
        'wedding_ceremony_type',
        'residence_address',
        'solemnizing_officer',
        'registered_lcr',
    ];
}
