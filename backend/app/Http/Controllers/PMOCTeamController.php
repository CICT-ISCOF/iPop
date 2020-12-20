<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\File;
use App\Models\Log;
use App\Models\PMOCTeam;
use App\Models\Role;
use Illuminate\Http\Request;

class PMOCTeamController extends Controller
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
    public function index(Request $request)
    {
        $builder = PMOCTeam::getApproved();
        $builder = tap($builder, function ($builder) use ($request) {
            foreach ($request->all() as $parameter => $value) {
                $builder = $builder->where($parameter, $value);
            }
            return $builder;
        });
        return $builder->get();
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

        $pMOCTeam = PMOCTeam::create($data);
        $pMOCTeam->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a PMOC Team.')
        ]);
        $pMOCTeam->photo()->save($file);
        $pMOCTeam->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a PMOC Team.");

        return $pMOCTeam;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PMOCTeam  $pMOCTeam
     * @return \Illuminate\Http\Response
     */
    public function show(PMOCTeam $pmocTeam)
    {
        return PMOCTeam::findApproved($pmocTeam->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PMOCTeam  $pMOCTeam
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PMOCTeam $pmocTeam)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'numeric'],
            'photo' => ['nullable', 'isFile'],
        ]);

        if (isset($data['photo'])) {
            $file = File::process($data['photo']);
            $old = $pmocTeam->photo;
            $pmocTeam->photo()->save($file);
            $old->delete();
        }

        $pmocTeam->update($data);
        $pmocTeam->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a PMOC Team.'));

        Log::record("Updated a PMOC Team.");

        return $pmocTeam;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PMOCTeam  $pMOCTeam
     * @return \Illuminate\Http\Response
     */
    public function destroy(PMOCTeam $pMOCTeam)
    {
        $pMOCTeam->makeDeleteRequest();

        Log::record("Deleted a PMOC Team.");

        return response('', 204);
    }
}
