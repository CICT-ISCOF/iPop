<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarraigeStatistics extends Model
{
    use HasFactory, HasApproval;
    
    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'population',
        'total_marriages',
        'church',
        'civil',
        'others',
    ];
    

}