<?php

namespace App\Models\CMS;

use App\Models\File;
use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chart extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['photo_id'];
    protected $with = ['photo'];

    public static function booted()
    {
        static::deleted(function ($chart) {
            $chart->photo->delete();
        });
    }

    public function photo()
    {
        return $this->belongsTo(File::class, 'photo_id');
    }
}
