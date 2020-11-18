<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityFile extends Model
{
    use HasFactory;

    protected $fillable = ['activity_id', 'file_id'];
    protected $with = ['file'];

    public static function booted()
    {
        static::deleted(function ($file) {
            $file->file->delete();
        });
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
