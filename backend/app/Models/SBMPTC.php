<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SBMPTC extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'name',
        'location',
        'tc_coordinator_count',
        'population',
        'services',
        'municipality',
        'district',
    ];

    public static function booted()
    {
        static::deleting(function ($sbmptc) {
            $sbmptc->members->each(function ($member) {
                $member->delete();
            });

            $sbmptc->photos->each(function ($photo) {
                $photo->delete();
            });
        });
    }

    public function members()
    {
        return $this->hasMany(MTCMMember::class, 'sbmptc_id');
    }

    public function photos()
    {
        return $this->hasMany(SBMPTCPhoto::class, 'sbmptc_id');
    }
}
