<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Other extends Model
{
    use HasFactory;

    protected $fillable = ['thumbnail_id', 'name', 'user_id'];

    protected static function booted()
    {
        static::deleting(function (self $other) {
            $other->files->each(function (OtherFile $otherFile) {
                return $otherFile->delete();
            });
        });

        static::deleted(function (self $other) {
            $other->thumbnail->delete();
        });
    }

    public function thumbnail()
    {
        return $this->belongsTo(File::class, 'thumbnail_id');
    }

    public function files()
    {
        return $this->hasMany(OtherFile::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
