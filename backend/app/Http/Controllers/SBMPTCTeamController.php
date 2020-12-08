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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SBMPTCTeam::getApproved()
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SBMPTCTeam $team
     * @return \Illuminate\Http\Response
     */
    public function show(SBMPTCTeam $team)
    {
        return SBMPTCTeam::findApproved($team->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMPTCTeam $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SBMPTCTeam $team)
    {
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMPTCTeam $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(SBMPTCTeam $team)
    {
        $team->makeDeleteRequest();

        Log::record("Deleted a SBMPTC Team.");

        return response('', 204);
    }
}
