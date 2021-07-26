<?php

namespace App\Models\Statistics;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MigrationStatistic extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'municipality',
        'barangay',
        'year',
        'total_in_migrations',
        'total_out_migrations',
        'net_migrations',
        'total_population',
    ];

    protected $appends = ['profile'];

    public function getProfileAttribute()
    {
        return Profile::getApproved()
            ->where('year', $this->year)
            ->where('barangay', $this->barangay)
            ->where('municipality', $this->municipality)
            ->first();
    }
}
