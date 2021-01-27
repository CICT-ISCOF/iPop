<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgeProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'municipality',
        'hh_population',
        '0_to_14',
        '15_to_64',
        '65_and_over',
        'young_dependency',
        'old_dependency',
        'dependency',
    ];
}
