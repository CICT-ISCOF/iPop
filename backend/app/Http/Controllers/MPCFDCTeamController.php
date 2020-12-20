<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\File;
use App\Models\Log;
use App\Models\MPCFDCTeam;
use App\Models\Role;
use Illuminate\Http\Request;

class MPCFDCTeamController extends Controller
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
        return MPCFDCTeam::getApproved()->paginate(10);
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
            'priority' => ['nullable', 'numeric'],
            'photo' => ['required', 'isFile'],
        ]);

        $file = File::process($data['photo']);
        $file->public = true;
        $file->save();
        $data['photo_id'] = $file->id;

        $MPCFDCTeam = MPCFDCTeam::create($data);
        $MPCFDCTeam->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a MPCFDC Team.'),
        ]));
        $MPCFDCTeam->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a MPCFDC Team.");

        return $MPCFDCTeam;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MPCFDCTeam  $MPCFDCTeam
     * @return \Illuminate\Http\Response
     */
    public function show(MPCFDCTeam $MPCFDCTeam)
    {
        return MPCFDCTeam::findApproved($MPCFDCTeam->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MPCFDCTeam  $MPCFDCTeam
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MPCFDCTeam $MPCFDCTeam)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'numeric'],
            'photo' => ['nullable', 'isFile'],
        ]);

        if (isset($data['photo'])) {
            $file = File::process($data['photo']);
            $file->public = true;
            $file->save();
            $old = $MPCFDCTeam->photo;
            $MPCFDCTeam->update(['photo_id' => $file->id]);
            $old->delete();
        }

        $MPCFDCTeam->update($data);
        $MPCFDCTeam->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a MPCFDC Team.'));

        Log::record("Updated a MPCFDC Team.");

        return $MPCFDCTeam;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MPCFDCTeam  $MPCFDCTeam
     * @return \Illuminate\Http\Response
     */
    public function destroy(MPCFDCTeam $MPCFDCTeam)
    {
        $MPCFDCTeam->makeDeleteRequest();

        Log::record("Deleted a MPCFDC Team.");

        return response('', 204);
    }
}
