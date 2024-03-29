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

    public function index(Request $request)
    {
        $builder = MPCFDCPersonnel::getApproved();
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

    public function show($id)
    {
        $mPCFDCPersonnel = MPCFDCPersonnel::findOrFail($id);
        return MPCFDCPersonnel::findApproved($mPCFDCPersonnel->id)
            ->first() ?: response('', 404);
    }

    public function update(Request $request, $id)
    {
        $mPCFDCPersonnel = MPCFDCPersonnel::findOrFail($id);
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

    public function destroy($id)
    {
        $mPCFDCPersonnel = MPCFDCPersonnel::findOrFail($id);
        $mPCFDCPersonnel->makeDeleteRequest();

        Log::record('Deleted a MPCFDC Personnel');

        return response('', 204);
    }
}
