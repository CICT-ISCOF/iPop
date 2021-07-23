<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMCAgeGroup extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        '15_to_19_male',
        '15_to_19_female',
        '20_to_24_male',
        '20_to_24_female',
        '25_to_29_male',
        '25_to_29_female',
        '30_to_34_male',
        '30_to_34_female',
        '35_to_39_male',
        '35_to_39_female',
        '40_to_44_male',
        '40_to_44_female',
        '45_and_above_male',
        '45_and_above_female',
    ];
}
