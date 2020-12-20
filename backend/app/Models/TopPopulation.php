<?php

namespace App\Models;

use App\Casts\JSON;
use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopPopulation extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['data'];

    protected $casts = [
        'data' => JSON::class,
    ];
}
