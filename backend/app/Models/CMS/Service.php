<?php

namespace App\Models\CMS;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['title'];
    protected $with = ['offers'];

    public static function booted()
    {
        static::saving(function ($service) {
            $service->slug = Str::slug($service->title);
        });
    }

    public function offers()
    {
        return $this->hasMany(ServiceOffer::class);
    }
}
