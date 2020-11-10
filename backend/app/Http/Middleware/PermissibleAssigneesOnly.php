<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class PermissibleAssigneesOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();

        if (!$user->hasPermissionTo('Assign Permissions') && !$user->hasRole('Super Admin')) {
            return response('', 403);
        }

        return $next($request);
    }
}
