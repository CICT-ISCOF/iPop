<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PopulationChart extends Model
{
    use HasFactory;

    protected $fillable = ['municipality', 'barangay', 'year', 'data'];

    protected $casts = [
        'data' => JSON::class,
    ];
}
