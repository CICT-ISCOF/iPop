<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\MPCFDC;
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
    public function index()
    {
        return MPCFDC::getApproved()->paginate(10);
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
        ]);

        $mPCFDC = MPCFDC::create($data);
        $mPCFDC->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a MPCFDC.'),
        ]));
        $mPCFDC->setApproved($request->user()->hasRole(Role::ADMIN));

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
        ]);

        $mPCFDC->update($data);
        $mPCFDC->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a MPCFDC.'));

        Log::record("Updated a MPCFDC.");

        return $mPCFDC;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MPCFDC  $mPCFDC
     * @return \Illuminate\Http\Response
     */
    public function destroy(MPCFDC $mPCFDC)
    {
        $mPCFDC->makeDeleteRequest();

        Log::record("Deleted a MPCFDC.");

        return response('', 404);
    }
}
