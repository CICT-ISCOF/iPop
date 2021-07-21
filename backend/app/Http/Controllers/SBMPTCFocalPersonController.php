<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use App\Models\SBMPTCFocalPerson;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SBMPTCFocalPersonController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    public function index()
    {
        return SBMPTCFocalPerson::getApproved()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $sBMPTCFocalPerson = SBMPTCFocalPerson::create($data);
        $sBMPTCFocalPerson->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a SBMPTC Focal Person.')
        ]));
        $sBMPTCFocalPerson->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a SBMPTC Focal Person.");

        return $sBMPTCFocalPerson;
    }

    
    public function show($id)
    {
        $sBMPTCFocalPerson = SBMPTCFocalPerson::findOrFail($id);
        return SBMPTCFocalPerson::findApproved($sBMPTCFocalPerson->id)->first()
            ?: response('', 404);
    }

    public function update(Request $request, $id)
    {
        $sBMPTCFocalPerson = SBMPTCFocalPerson::findOrFail($id);
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        $sBMPTCFocalPerson->update($data);
        $sBMPTCFocalPerson->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a SBMPTC Focal Person.'));

        Log::record("Updated a SBMPTC Focal Person.");

        return $sBMPTCFocalPerson;
    }

  
    public function destroy($id)
    {
        $sBMPTCFocalPerson = SBMPTCFocalPerson::findOrFail($id);
        $sBMPTCFocalPerson->makeDeleteRequest();

        Log::record("Deleted a SBMPTC Focal Person.");

        return response('', 204);
    }
}
