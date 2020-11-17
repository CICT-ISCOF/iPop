<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MPCFDC extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'name',
        'location',
        'municipality',
        'district',
        'tc_coordinator_count',
        'population',
        'services',
    ];
}
