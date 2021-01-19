<?php

namespace App\Models;

use App\Casts\JSON;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMCAgeGroup extends Model
{
    use HasFactory;

    protected $fillable = ['municipality', 'barangay', 'year', 'data'];

    protected $casts = [
        'data' => JSON::class,
    ];
}
