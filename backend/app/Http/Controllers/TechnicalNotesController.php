<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use App\Models\TechnicalNotes;
use Illuminate\Http\Request;

class TechnicalNotesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    }
    
    public function index(Request $request)
    {
        $data = $request->all();
        return TechnicalNotes::where('type',$data['type'])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string', 'max:255'],
            'type' => ['required', 'string', 'max:255'],
        ]);
        $technicalNote = TechnicalNotes::create($data);
        $technicalNote->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a technical note for type'.$data['type'].'.')
        ]));
        $technicalNote->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User created a technical note for type".$data['type'].'.');
        return $technicalNote;
    }

    public function destroy($id)
    {
        $technicalNotes = TechnicalNotes::findOrFail($id);
        $technicalNotes->makeDeleteRequest();
        Log::record("User removed a technical note.");
        return response('', 204);
    }
}
