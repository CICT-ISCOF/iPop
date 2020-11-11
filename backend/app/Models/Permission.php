<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Permission as Model;

class Permission extends Model
{
    use HasFactory;

    const ASSIGN = 'assign-permissions.*';

    const DEFAULTS = [
        self::ASSIGN,
    ];
}
