<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    protected $fillable = ['link_id', 'h1', 'h4', 'p', 'position'];
}
