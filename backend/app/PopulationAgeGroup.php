<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PopulationAgeGroup extends Model
{
    protected $fillable = ['low', 'mid', 'high', 'population_id'];

    public function population()
    {
        return $this->belongsTo(Population::class);
    }
}
