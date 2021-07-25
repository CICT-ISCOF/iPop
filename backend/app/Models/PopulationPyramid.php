<?php

namespace App\Models;

use App\Casts\JSON;
use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopulationPyramid extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['municipality', 'barangay', 'year', 'data','type'];

    protected $casts = [
        'data' => JSON::class,
    ];
}
