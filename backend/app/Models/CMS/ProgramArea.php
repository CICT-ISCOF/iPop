<?php

namespace App\Models\CMS;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProgramArea extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['title', 'description'];
    protected $with = ['activities'];

    public static function booted()
    {
        static::saving(function ($programArea) {
            $programArea->slug = Str::slug($programArea->title);
        });

        static::deleting(function ($programArea) {
            $programArea->activities->each(function ($activity) {
                $activity->delete();
            });
        });
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}
