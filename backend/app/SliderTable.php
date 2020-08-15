<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SliderTable extends Model
{
    protected $fillable = ['link_id', 'position'];

    protected static function booted()
    {
        static::deleting(function ($sliderTable) {
            foreach ($sliderTable->sliders as $slider) {
                $slider->delete();
            }
        });
    }

    public function sliders()
    {
        return $this->hasMany(Slider::class);
    }
}
