<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    use HasFactory;

    const ADMIN = 'Super-Admin';
    const VIEWER = 'Viewer';

    const DEFAULTS = [
        static::ADMIN,
        static::VIEWER,
    ];
}
