<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMCESS extends Model
{
    use HasFactory;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'student_male',
        'student_female',
        'employed_male',
        'employed_female',
        'not_employed_male',
        'not_employed_female',
    ];
}
