<?php

namespace App\Models;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonthChart extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['type', 'municipality', 'barangay', 'year', 'month', 'males', 'females'];
    protected $appends = ['total'];

    public function getTotalAttribute()
    {
        return $this->males + $this->females;
    }
}
