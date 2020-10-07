<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GridListItem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'grid_list_id', 'file_id'];
    protected $with = ['file'];

    public function grid()
    {
        return $this->belongsTo(GridList::class);
    }

    public function file()
    {
        return $this->belongsTo(File::class);
    }
}
