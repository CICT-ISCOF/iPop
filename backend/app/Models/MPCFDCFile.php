<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MPCFDCFile extends Model
{
    use HasFactory;

    protected $fillable = ['mpcfdc_id', 'file_id'];

    protected $with = ['file'];

    protected static function booted()
    {
        static::deleted(function (self $file) {
            $file->file->delete();
        });
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }

    public function mpcfdc()
    {
        return $this->belongsTo(MPCFDC::class, 'mpcfdc_id');
    }
}
