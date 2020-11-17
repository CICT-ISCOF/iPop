<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        return Log::with('user.profilePicture')
            ->orderBy('created_at', 'DESC')
            ->paginate(10);
    }

    public function destroy(Request $request, Log $log)
    {
        if (!$request->user()->hasRole(Role::ADMIN)) {
            return response('', 403);
        }
        $log->delete();
        Log::record('User cleared a log.');
        return response('', 204);
    }

    public function clear(Request $request)
    {
        if (!$request->user()->hasRole(Role::ADMIN)) {
            return response('', 403);
        }
        Log::truncate();
        Log::record('User cleared all logs.');
        return response('', 204);
    }

    public function visit()
    {
        Log::record('A user visited the website.');
        return response('', 204);
    }
}
