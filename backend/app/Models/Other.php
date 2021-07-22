<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Other extends Model
{
    use HasFactory;

    protected $fillable = ['file_id'];

    protected static function booted()
    {
        static::deleted(function (self $other) {
            $other->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
