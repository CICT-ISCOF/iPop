<?php

namespace App;

class OutMigration extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'total_cases',
        'case_number',
        'household_number',
        'month',
        'name',
        'sex',
        'date_of_birth',
        'age',
        'age_in_months',
        'age_bracket',
        'completed_educational_attainment',
        'actual_occupation',
        'major_occupation',
        'monthly_income',
        'skills_acquired',
        'actual_place_of_origin',
        'place_of_origin',
        'reasons_for_out_migrating',
    ];

    protected static function booted()
    {
        static::deleting(function ($outMigration) {
            $outMigration->record->delete();
        });
    }

    public function record()
    {
        return $this->morphOne(Record::class, 'recordable');
    }
}
