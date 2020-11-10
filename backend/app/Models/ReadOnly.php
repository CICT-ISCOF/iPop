<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

abstract class ReadOnly extends Model
{
    use Searchable;

    public $timestamps = false;

    public function toSearchableArray()
    {
        return $this->toArray();
    }

    public static function create()
    {
        return false;
    }

    public function save(array $options = [])
    {
        return false;
    }

    public function update(array $attributes = [], array $options = [])
    {
        return false;
    }

    public function delete()
    {
        return false;
    }
}
