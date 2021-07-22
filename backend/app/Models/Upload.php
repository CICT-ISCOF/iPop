<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Upload extends Model
{
    use HasFactory;

    protected $fillable = ['file_id', 'user_id', 'type', 'approved'];

    protected $casts = [
        'approved' => 'boolean',
    ];

    protected static function booted()
    {
        static::deleted(function (self $upload) {
            $upload->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeType($query, $value)
    {
        return $query->where('type', $value);
    }
}
