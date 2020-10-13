<?php

namespace App\Http\Controllers\CMS;

use App\Http\Controllers\Controller as BaseController;

abstract class Controller extends BaseController
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'restrict.blocked', 'throttle'])
            ->except(['index', 'show']);
    }
}
