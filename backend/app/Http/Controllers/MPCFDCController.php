<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Log;
use App\Models\MPCFDC;
use App\Models\MPCFDCFile;
use App\Models\Role;
use Illuminate\Http\Request;

class MPCFDCController extends Controller
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
        $builder = MPCFDC::getApproved();
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
            'location' => ['required', 'string', 'max:255'],
            'municipality' => ['required', 'string', 'max:255'],
            'district' => ['required', 'string', 'max:255'],
            'tc_coordinator_count' => ['nullable', 'numeric'],
            'population' => ['nullable', 'numeric'],
            'services' => ['nullable', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'isFile'],
        ]);

        $mPCFDC = MPCFDC::create($data);
        $mPCFDC->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a MPCFDC.'),
        ]);
        $mPCFDC->setApproved($request->user()->hasRole(Role::ADMIN));

        if (isset($data['files'])) {
            collect($data['files'])->each(function ($raw) use ($mPCFDC) {
                $file = File::process($raw);
                $file->public = true;
                $file->save();
                $mPCFDC->files()->create(['file_id' => $file->id]);
            });
        }

        $mPCFDC->load('files');

        Log::record("Created a MPCFDC.");

        return $mPCFDC;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MPCFDC  $mPCFDC
     * @return \Illuminate\Http\Response
     */
    public function show(MPCFDC $mPCFDC)
    {
        return MPCFDC::findApproved($mPCFDC->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MPCFDC  $mPCFDC
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MPCFDC $mPCFDC)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'municipality' => ['nullable', 'string', 'max:255'],
            'district' => ['nullable', 'string', 'max:255'],
            'tc_coordinator_count' => ['nullable', 'numeric'],
            'population' => ['nullable', 'numeric'],
            'services' => ['nullable', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'isFile'],
        ]);

        $mPCFDC->update($data);
        $mPCFDC->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a MPCFDC.'));

        if (isset($data['files'])) {
            $mPCFDC->files->each(function (MPCFDCFile $file) {
                $file->delete();
            });
            collect($data['files'])->each(function ($raw) use ($mPCFDC) {
                $file = File::process($raw);
                $file->public = true;
                $file->save();
                $mPCFDC->files()->create(['file_id' => $file->id]);
            });
        }

        $mPCFDC->load('files');

        Log::record("Updated a MPCFDC.");

        return $mPCFDC;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MPCFDC  $mPCFDC
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mPCFDC = MPCFDC::findOrFail($id);
        $mPCFDC->makeDeleteRequest();

        Log::record("Deleted a MPCFDC.");

        return response('', 404);
    }
}
