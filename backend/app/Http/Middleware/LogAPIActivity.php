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
                // 'uri' => $request->fullUrlWithQuery(),
                'method' => $request->method(),
                'body' => $request->all(),
                'response' => $response->getContent(),
            ])
        );
        return $response;
    }
}
