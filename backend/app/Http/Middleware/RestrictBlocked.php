<?php

namespace App\Http\Middleware;

use Closure;

class RestrictBlocked
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->user()->isBlocked()) {
            return response(
                [
                    'errors' => [
                        'account' => [
                            'This account is currently blocked. Please contact your administrator or the developers of this app.',
                        ],
                    ],
                ],
                403
            );
        }
        return $next($request);
    }
}
