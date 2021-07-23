<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMCCS extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'single_male',
        'single_female',
        'live_in_male',
        'live_in_female',
        'widow_male',
        'widow_female',
        'separated_male',
        'separated_female',
    ];
}
