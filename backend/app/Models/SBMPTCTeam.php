<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SBMPTCTeam extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['name', 'position'];
}
