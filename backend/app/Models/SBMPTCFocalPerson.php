<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SBMPTCFocalPerson extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['name', 'sbmptc_id'];

    public function sbmptc()
    {
        return $this->belongsTo(SBMPTC::class, 'sbmptc_id');
    }
}
