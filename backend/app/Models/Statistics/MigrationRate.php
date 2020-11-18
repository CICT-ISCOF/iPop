<?php

namespace App\Models\Statistics;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MigrationRate extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'month',
        'year',
        'value',
    ];
}
