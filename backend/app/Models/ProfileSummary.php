<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileSummary extends Model
{
    use HasFactory;

    protected $fillable = ['file_id'];
    protected $with = ['file'];

    protected static function booted()
    {
        static::deleted(function (self $profileSummary) {
            $profileSummary->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
