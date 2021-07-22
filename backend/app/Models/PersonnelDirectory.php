<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonnelDirectory extends Model
{
    use HasFactory, HasApproval;  
    
    protected $fillable = ['type', 'name', 'position', 'phone', 'email'];
}
