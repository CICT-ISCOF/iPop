<?php

namespace App\Models\CMS;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardListItem extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description'];

    public function card()
    {
        return $this->belongsTo(CardList::class);
    }
}
