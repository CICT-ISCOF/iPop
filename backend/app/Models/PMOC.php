<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMOC extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'sessions',
        'oriented_couples',
        'individuals_interviewed',
        'applicants_by_age_group',
        'applicants_by_employment_status',
        'applicants_by_income_class',
        'applicants_by_knowledge_on_fp',
        'year',
    ];
}
