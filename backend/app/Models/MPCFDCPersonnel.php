<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MPCFDCPersonnel extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['name', 'position', 'mpcfdc_id', 'photo_id'];
    protected $with = ['photo'];

    public function photo()
    {
        return $this->belongsTo(File::class, 'photo_id');
    }

    public function mpcfdc()
    {
        return $this->belongsTo(MPCFDC::class, 'mpcfdc_id');
    }
}
