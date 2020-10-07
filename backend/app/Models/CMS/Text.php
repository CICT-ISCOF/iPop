<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'link_id'];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }
}
