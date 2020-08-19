<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogAPIActivity
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
        $response = $next($request);
        Log::info(
            json_encode([
<<<<<<< HEAD
                // 'uri' => $request->fullUrlWithQuery(),
=======
                'uri' => $request->fullUrl(),
>>>>>>> 9f3422d829fd1642aff5be236b8f4abe6f752ad0
                'method' => $request->method(),
                'body' => $request->all(),
                'response' => $response->getContent(),
            ])
        );
        return $response;
    }
}
