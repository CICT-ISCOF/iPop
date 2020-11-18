<?php

namespace App\Models\CMS;

use App\Traits\HasApproval;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory, HasApproval;

    protected $fillable = ['title', 'url'];
    protected $with = ['medias'];

    public static function booted()
    {
        static::deleting(function($award) {
            $award->medias->each(function($media) {
                $media->delete();
            });
        })
    }

    public function medias()
    {
        return $this->hasMany(AwardMedia::class);
    }
}
