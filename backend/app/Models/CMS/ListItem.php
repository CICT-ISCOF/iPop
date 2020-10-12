<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListItem extends Model
{
    use HasFactory;

    protected $fillable = ['body', 'link_list_id'];

    public function list()
    {
        return $this->belongsTo(LinkList::class);
    }
}
