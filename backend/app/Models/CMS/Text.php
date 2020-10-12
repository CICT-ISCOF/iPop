<?php

namespace App\Models\CMS;

use App\Traits\HasSlug;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = ['title', 'body', 'link_id'];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
