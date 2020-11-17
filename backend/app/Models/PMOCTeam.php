<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PMOCTeam extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = [
        'name',
        'position',
        'priority',
    ];

    public function photo()
    {
        return $this->belongsTo(File::class, 'photo_id');
    }
}
