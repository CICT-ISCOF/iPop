<?php

namespace App\Models\CMS;

use App\Models\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SliderListItem extends Model
{
    use HasFactory;

    protected $fillable = ['file_id', 'slider_list_id'];
    protected $with = ['file'];

    protected static function booted()
    {
        static::deleting(function($item) {
            $item->file->delete();
        });
    }

    public function slider()
    {
        return $this->belongsTo(SliderList::class);
    }

    public function file()
    {
        return $this->hasOne(File::class);
    }
}
