<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Log;
use App\Models\SBMPTCPersonnel;
use App\Models\Role;
use App\Models\SBMPTC;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SBMPTCPersonnelController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = SBMPTCPersonnel::getApproved();
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
            'sbmptc_id' => ['required', Rule::exists('s_b_m_p_t_c_s', 'id')],
            'photo' => ['required', 'isFile'],
        ]);

        $file = File::process($data['photo']);
        $file->public = true;
        $file->save();

        $data['photo_id'] = $file->id;

        $sBMPTCPersonnel = SBMPTCPersonnel::create($data);
        $sBMPTCPersonnel->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add SBMPTC Personnel'),
        ]);
        $sBMPTCPersonnel->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a SBMPTC Personnel.");

        return $sBMPTCPersonnel;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SBMPTCPersonnel  $sBMPTCPersonnel
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sBMPTCPersonnel = SBMPTCPersonnel::findOrFail($id);
        return SBMPTCPersonnel::findApproved($sBMPTCPersonnel->id)
            ->first() ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMPTCPersonnel  $sBMPTCPersonnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $sBMPTCPersonnel = SBMPTCPersonnel::findOrFail($id);
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'sbmptc_id' => ['nullable', Rule::exists('s_b_m_p_t_c_s', 'id')],
            'photo' => ['nullable', 'isFile'],
        ]);

        if (isset($data['photo'])) {
            $file = File::process($data['photo']);
            $file->public = true;
            $file->save();

            $oldPhoto = $sBMPTCPersonnel->photo;
            $sBMPTCPersonnel->photo_id = $file->id;
            $sBMPTCPersonnel->save();
            $oldPhoto->delete();
        }

        $sBMPTCPersonnel->update($data);
        $sBMPTCPersonnel->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a SBMPTC Personnel'));

        Log::record("Updated a SBMPTC Personnel.");

        return $sBMPTCPersonnel;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMPTCPersonnel  $sBMPTCPersonnel
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $sBMPTCPersonnel = SBMPTCPersonnel::findOrFail($id);
        $sBMPTCPersonnel->makeDeleteRequest();

        Log::record('Deleted a SBMPTC Personnel');

        return response('', 204);
    }
}
