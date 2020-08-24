<?php

namespace App;

class CPDB extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'zone',
        'household_number',
        'household_characteristics',
        'number_of_persons_living',
        'household_size_bracket',
        'number_of_families',
        'line_number_of_household_member',
        'name_of_household_member',
        'relationship_to_household_head',
        'sex',
        'date_of_birth',
        'age',
        'age_bracket',
        'civil_status',
        'highest_educational_attainment',
        'school_attendance',
        'level_of_school_attendance',
        'reason_for_not_attending_school',
        'religious_affiliation',
        'have_special_skills',
        'type_of_special_skill',       
        'presence_of_disability',
        'type_of_disability',
        'indigenous_group_or_tribe',
        'name_of_group_or_tribe',      
        'active_philhealth_member',
        'philhealth_membership_specify',
        'usual_occupation_of_working_household_member',       
        'gross_monthly_income',
        'income_bracket',
        'place_of_work',
        'number_of_years_stay',
        'number_of_years_bracket',
        'fp_currently_used',
        'total_household_monthly_income',
        'household_income_bracket',
        'house_ownership',
        'house_levels',
        'house_construction_material',
        'homelot_ownership_or_tenure_status',
        'source_of_drinking_water',
        'type_of_toilet',
        'garbage_disposal',
        'type_of_lighting_fuel',
        'type_of_cooking_fuel',       
        'geohazard_area',
        'household_location',
        'flood_prone_area_water_level',
        'access_to_infotech',
        '4ps_beneficiary_household',
    ];

    protected static function booted()
    {
        static::deleting(function ($cpdb) {
            $cpdb->record->delete();
        });
    }

    public function record()
    {
        return $this->morphOne(Record::class, 'recordable');
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
