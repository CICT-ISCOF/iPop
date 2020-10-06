<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GridListItem extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function grid()
    {
        return $this->belongsTo(GridList::class);
    }
}
