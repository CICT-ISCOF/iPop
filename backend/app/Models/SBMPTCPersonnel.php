<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SBMPTCPersonnel extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['name', 'position', 'sbmptc_id', 'photo_id'];
    protected $with = ['photo'];

    public function photo()
    {
        return $this->belongsTo(File::class, 'photo_id');
    }

    public function sbmptc()
    {
        return $this->belongsTo(SBMPTC::class, 'sbmptc_id');
    }
}
