<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMCAMIS extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'no_income_male',
        'no_income_female',
        'under_5k_male',
        'under_5k_female',
        '5k_to_10k_male',
        '5k_to_10k_female',
        '10k_to_15k_male',
        '10k_to_15k_female',
        '15k_to_20k_male',
        '15k_to_20k_female',
        '20k_to_25k_male',
        '20k_to_25k_female',
        'above_25k_male',
        'above_25k_female',
    ];
}
