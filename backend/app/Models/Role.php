<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as Model;

class Role extends Model
{
    use HasFactory;

    const ADMIN = 'Super Admin';
    const VIEWER = 'Viewer';
    const PPO_ONE = 'PPOI';
    const PPO_TWO = 'PPOII';
    const FOD = 'FOD';
    const TRD = 'TRD';

    const DEFAULTS = [
        self::ADMIN,
        self::VIEWER,
        self::PPO_ONE,
        self::PPO_TWO,
        self::FOD,
        self::TRD,
    ];
}
