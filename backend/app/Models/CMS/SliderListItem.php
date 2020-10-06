<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SliderListItem extends Model
{
    use HasFactory;

    public function slider()
    {
        return $this->belongsTo(SliderList::class);
    }

    public function file()
    {
        return $this->hasOne(File::class);
    }
}
