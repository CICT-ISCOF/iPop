<?php

namespace App\Http\Middleware;

use Closure;
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
    public function handle(\Illuminate\Http\Request $request, Closure $next)
    {
        $response = $next($request);
        Log::info(
            json_encode([
                'method' => $request->method(),
                'body' => $request->all(),
                'response' => $response->getContent(),
            ])
        );
        return $response;
    }
}
