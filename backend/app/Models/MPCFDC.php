<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MPCFDC extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'name',
        'district',
        'municipality',
        'services',
    ];

    protected $with = ['files'];

    protected static function booted()
    {
        static::deleting(function (self $mPCFDC) {
            $mPCFDC->files->each(function (MPCFDCFile $file) {
                $file->delete();
            });
        });
    }

    public function files()
    {
        return $this->hasMany(MPCFDCFile::class, 'mpcfdc_id');
    }
}
