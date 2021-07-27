<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OtherFile extends Model
{
    use HasFactory;

    protected $fillable = ['other_id', 'file_id'];

    protected static function booted()
    {
        static::deleted(function (self $otherFile) {
            $otherFile->file->delete();
        });
    }

    public function other()
    {
        return $this->belongsTo(Other::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
