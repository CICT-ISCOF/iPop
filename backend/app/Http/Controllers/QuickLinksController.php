<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\QuickLinks;
use App\Models\Role;
use Illuminate\Http\Request;

class QuickLinksController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    } 
    
    public function index()
    {
        return QuickLinks::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'string', 'url'],
        ]);
        $quickLink = QuickLinks::create($data);
        $quickLink->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a quick link.')
        ]));
        $quickLink->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User created a quick link.");
        return $quickLink;
    }

    public function destroy($id)
    {
        $quickLink = QuickLinks::findOrFail($id);
        $quickLink->makeDeleteRequest();
        Log::record("User removed a quick link.");
        return response('', 204);
    }
}
