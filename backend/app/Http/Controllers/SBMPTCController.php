<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Role;
use App\Models\SBMPTC;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SBMPTCController extends Controller
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
        return SBMPTC::getApproved()
            ->with('members')
            ->with('photos')
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
            'location' => ['required', 'string', 'max:255'],
            'tc_coordinator_count' => ['required', 'numeric'],
            'population' => ['required', 'numeric'],
            'services' => ['required', 'string'],
            'municipality' => ['required', Rule::exists('municipalities', 'name')],
            'district' => ['required', 'string', 'max:255'],
        ]);

        $sbmptc = SBMPTC::create($data);
        $sbmptc->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $sbmptc->setApproved($request->user()->hasRole(Role::ADMIN));

        return $sbmptc;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SBMPTC::findApproved($id)
            ->with('members')
            ->with('photos')
            ->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMPTC  $sBMPTC
     * @return \Illuminate\Http\sbmptc
     */
    public function update(Request $request, SBMPTC $sbmptc)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'tc_coordinator_count' => ['nullable', 'numeric'],
            'population' => ['nullable', 'numeric'],
            'services' => ['nullable', 'string'],
            'municipality' => ['nullable', Rule::exists('municipalities', 'name')],
            'district' => ['nullable', 'string', 'max:255'],
        ]);

        $sbmptc->update($data);
        $sbmptc->setApproved($request->user()->hasRole(Role::ADMIN));

        return $sbmptc;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMPTC  $sbmptc
     * @return \Illuminate\Http\Response
     */
    public function destroy(SBMPTC $sbmptc)
    {
        $sbmptc->delete();
        return response('', 204);
    }
}
