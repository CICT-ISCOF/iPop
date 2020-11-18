<?php

namespace App\Models\CMS;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ServiceOffer extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['title'];
    protected $with = ['approval'];

    public static function booted()
    {
        static::saving(function ($offer) {
            $offer->slug = Str::slug($offer->title);
        });
    }

    public function service()
    {
        return $this->belongsTo(Activity::class);
    }
}
