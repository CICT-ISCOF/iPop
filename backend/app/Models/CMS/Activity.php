<?php

namespace App\Models\CMS;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Activity extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['title', 'description'];
    protected $with = ['files', 'approval'];

    public static function booted()
    {
        static::saving(function ($activity) {
            $activity->slug = Str::slug($activity->title);
        });

        static::deleting(function ($activity) {
            $activity->files->each(function ($file) {
                $file->delete();
            });
        });
    }

    public function program()
    {
        return $this->belongsTo(ProgramArea::class);
    }

    public function files()
    {
        return $this->hasMany(ActivityFile::class);
    }
}
