<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MTCMMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'municipality',
        'sbmptc_id'
    ];

    public function sbmptc()
    {
        return $this->belongsTo(SBMPTC::class);
    }
}
