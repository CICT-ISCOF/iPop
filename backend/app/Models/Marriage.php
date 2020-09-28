<?php

namespace App\Models;

class Marriage extends Model
{
    protected $fillable = [
        'sorting_number',
        'municipality',
        'barangay',
        'total_cases',
        'household_number',
        'case_number',
        'month',
        'age',
        'couple_name',
        'sex',
        'age_bracket',
        'address',
        'wedding_ceremony_type',
        'residence_address',
        'solemnizing_officer',
        'registered_lcr',
    ];

    protected static function booted()
    {
        static::deleting(function ($marriage) {
            $marriage->record->delete();
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
