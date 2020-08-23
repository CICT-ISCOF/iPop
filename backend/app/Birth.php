<?php

namespace App;

class Birth extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'total_cases',
        'number_of_cases',
        'household_number',
        'month',
        'name',
        'sex',
        'birth_order',
        'place_of_birth',
        'name_of_mother',
        'age_of_mother',
        'age_bracket_of_mother',
        'occupation_of_mother',
        'mothers_actual_work',
        'religion',
        'mother_marital_status',
        'registered_lcr',
    ];

    protected static function booted()
    {
        static::deleting(function ($birth) {
            $birth->record->delete();
        });
    }

    public function record()
    {
        return $this->morphOne(Record::class, 'recordable');
    }
}
