<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Population extends Model
{
    protected $fillable = [
        'census',
        'births',
        'deaths',
        'total',
        'males',
        'females',
    ];

    protected $dates = ['census'];

    public function stateable()
    {
        return $this->morphTo();
    }

    public function ageGroups()
    {
        return $this->hasMany(PopulationAgeGroup::class);
    }

    public function ageDistribution()
    {
        return $this->hasMany(PopulationAgeDistribution::class);
    }
}
