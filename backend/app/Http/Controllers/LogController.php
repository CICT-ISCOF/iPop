<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        return Log::with('user.profilePicture')
            ->orderBy('created_at', 'ASC')
            ->paginate(10);
    }

    public function destroy(Log $log)
    {
        $log->delete();
        Log::record('User cleared a log.');
        return response('', 204);
    }

    public function clear()
    {
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
