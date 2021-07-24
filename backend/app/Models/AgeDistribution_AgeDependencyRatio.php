<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class AgeDistribution_AgeDependencyRatio extends Model
{
    use HasFactory, HasApproval;
    
    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'hh_population',
        '0-14',
        '15-64',
        '65_and_over',
        'young_dependency',
        'old_dependency',
        'dependency',
    ];
    
  
}
