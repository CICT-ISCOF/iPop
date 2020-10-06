<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    public function file()
    {
        return $this->hasOne(File::class);
    }
}
