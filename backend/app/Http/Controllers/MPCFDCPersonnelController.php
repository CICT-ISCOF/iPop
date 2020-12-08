<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Log;
use App\Models\MPCFDCPersonnel;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MPCFDCPersonnelController extends Controller
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
    public function index()
    {
        return MPCFDCPersonnel::getApproved()->get();
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
            'mpcfdc_id' => ['required', Rule::exists('m_p_c_f_d_c_s', 'id')],
            'photo' => ['required', 'isFile'],
        ]);

        $file = File::process($data['photo']);
        $file->public = true;
        $file->save();

        $data['photo_id'] = $file->id;

        $mPCFDCPersonnel = MPCFDCPersonnel::create($data);
        $mPCFDCPersonnel->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add MPCFDC Personnel'),
        ]);
        $mPCFDCPersonnel->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a MPCFDC Personnel.");

        return $mPCFDCPersonnel;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MPCFDCPersonnel  $mPCFDCPersonnel
     * @return \Illuminate\Http\Response
     */
    public function show(MPCFDCPersonnel $mPCFDCPersonnel)
    {
        return MPCFDCPersonnel::findApproved($mPCFDCPersonnel->id)
            ->first() ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MPCFDCPersonnel  $mPCFDCPersonnel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MPCFDCPersonnel $mPCFDCPersonnel)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'mpcfdc_id' => ['nullable', Rule::exists('m_p_c_f_d_c_s', 'id')],
            'photo' => ['nullable', 'isFile'],
        ]);

        if (isset($data['photo'])) {
            $file = File::process($data['photo']);
            $file->public = true;
            $file->save();

            $oldPhoto = $mPCFDCPersonnel->photo;
            $mPCFDCPersonnel->photo_id = $file->id;
            $mPCFDCPersonnel->save();
            $oldPhoto->delete();
        }

        $mPCFDCPersonnel->update($data);
        $mPCFDCPersonnel->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a MPCFDC Personnel'));

        Log::record("Updated a MPCFDC Personnel.");

        return $mPCFDCPersonnel;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MPCFDCPersonnel  $mPCFDCPersonnel
     * @return \Illuminate\Http\Response
     */
    public function destroy(MPCFDCPersonnel $mPCFDCPersonnel)
    {
        $mPCFDCPersonnel->makeDeleteRequest();

        Log::record('Deleted a MPCFDC Personnel');

        return response('', 204);
    }
}
