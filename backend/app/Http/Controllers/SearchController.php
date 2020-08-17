<?php

namespace App\Http\Controllers;

use App\Log;
use App\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        Log::record('User searched for: ' . $request->input('value'));
        return User::search($request->input('field'), $request->input('value'));
    }
}
