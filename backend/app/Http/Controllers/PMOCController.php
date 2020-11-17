<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\PMOC;
use App\Models\Role;
use Illuminate\Http\Request;

class PMOCController extends Controller
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
        return PMOC::getApproved()->paginate(10);
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
            'municipality' => ['required', 'string', 'max:255'],
            'barangay' => ['required', 'string', 'max:255'],
            'sessions' => ['nullable', 'numeric'],
            'oriented_couples' => ['nullable', 'numeric'],
            'individuals_interviewed' => ['nullable', 'numeric'],
            'applicants_by_age_group' => ['nullable', 'numeric'],
            'applicants_by_employment_status' => ['nullable', 'numeric'],
            'applicants_by_income_class' => ['nullable', 'numeric'],
            'applicants_by_knowledge_on_fp' => ['nullable', 'numeric'],
        ]);

        $pMOC = PMOC::create($data);
        $pMOC->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $pMOC->setApproved($request->user()->hasRole(Role::ADMIN));

        return $pMOC;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PMOC  $pMOC
     * @return \Illuminate\Http\Response
     */
    public function show(PMOC $pMOC)
    {
        return PMOC::findApproved($pMOC->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PMOC  $pMOC
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PMOC $pMOC)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'sessions' => ['nullable', 'numeric'],
            'oriented_couples' => ['nullable', 'numeric'],
            'individuals_interviewed' => ['nullable', 'numeric'],
            'applicants_by_age_group' => ['nullable', 'numeric'],
            'applicants_by_employment_status' => ['nullable', 'numeric'],
            'applicants_by_income_class' => ['nullable', 'numeric'],
            'applicants_by_knowledge_on_fp' => ['nullable', 'numeric'],
        ]);

        $pMOC->update($data);
        $pMOC->setApproved($request->user()->hasRole(Role::ADMIN));

        return $pMOC;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PMOC  $pMOC
     * @return \Illuminate\Http\Response
     */
    public function destroy(PMOC $pMOC)
    {
        $pMOC->delete();

        return response('', 204);
    }
}
