<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GridTable extends Model
{
    protected $fillable = ['title', 'link_id', 'position'];

    protected static function booted()
    {
        static::deleting(function ($gridTable) {
            foreach ($gridTable->grids as $grid) {
                $grid->delete();
            }
        });
    }

    public function grids()
    {
        return $this->hasMany(Grid::class);
    }
}
