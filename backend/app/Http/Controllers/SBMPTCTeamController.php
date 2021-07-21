<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use App\Models\SBMPTCTeam;
use Illuminate\Http\Request;

class SBMPTCTeamController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    public function index()
    {
        return SBMPTCTeam::getApproved()
            ->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
        ]);

        $team = SBMPTCTeam::create($data);
        $team->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a SBMPTC Team.')
        ]));
        $team->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a SBMPTC Team.");

        return $team;
    }

    public function show($id)
    {
        $team = SBMPTCTeam::findOrFail($id);
        return SBMPTCTeam::findApproved($team->id)->first()
            ?: response('', 404);
    }

    public function update(Request $request, $id)
    {
        $team = SBMPTCTeam::findOrFail($id);
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
        ]);

        $team->update($data);
        $team->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a SBMPTC Team.'));

        Log::record("Updated a SBMPTC Team.");

        return $team;
    }

    public function destroy($id)
    {
        $team = SBMPTCTeam::findOrFail($id);
        $team->makeDeleteRequest();

        Log::record("Deleted a SBMPTC Team.");

        return response('', 204);
    }
}
