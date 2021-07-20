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
        'barangay',
        'year',
        'sessions',
        'oriented_couples',
    ];
}
