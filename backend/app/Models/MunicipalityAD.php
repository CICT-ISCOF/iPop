<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MunicipalityAD extends Model
{
    use HasFactory;

    protected $fillable = [
        'municipality',
        'year',
        'hh_population',
        'age_0_14',
        'age_15_64',
        '65_and_over',
        'young_dependency',
        'old_dependency',
        'dependency',
    ];
}
