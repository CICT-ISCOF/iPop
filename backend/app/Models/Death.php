<?php

namespace App\Models;

class Death extends Model
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
        'age_at_death',
        'age_bracket',
        'place_of_death',
        'registered_lcr',
    ];

    protected static function booted()
    {
        static::deleting(function ($death) {
            $death->record->delete();
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
