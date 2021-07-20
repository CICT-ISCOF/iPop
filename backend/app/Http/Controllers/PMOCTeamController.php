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

        $pMOCTeam = PMOCTeam::create($data);
        $pMOCTeam->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a PMOC Team.'),
        ]);
        $pMOCTeam->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a PMOC Team.");

        return $pMOCTeam;
    }

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
            $file->public = true;
            $file->save();
            $old = $pmocTeam->photo;
            $pmocTeam->update(['photo_id' => $file->id]);
            $old->delete();
        }

        $pmocTeam->update($data);
        $pmocTeam->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a PMOC Team.'));

        Log::record("Updated a PMOC Team.");

        return $pmocTeam;
    }

    public function destroy($id)
    {
        $pMOCTeam = PMOCTeam::findOrFail($id);
        $pMOCTeam->makeDeleteRequest();

        Log::record("Deleted a PMOC Team.");

        return response('', 204);
    }
}
