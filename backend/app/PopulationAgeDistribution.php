<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PopulationAgeDistribution extends Model
{
    protected $fillable = [
        'one_to_nine',
        'ten_to_nineteen',
        'twenty_to_twenty_nine',
        'thirty_to_thirtynine',
        'forty_to_fortynine',
        'fifty_to_fiftynine',
        'sixty_to_sixtynine',
        'seventy_to_seventynine',
        'eighty_plus',
        'population_id',
    ];

    public function population()
    {
        return $this->belongsTo(Population::class);
    }
}
