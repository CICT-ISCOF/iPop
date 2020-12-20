<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\MonthChart;
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
    public function index(Request $request)
    {
        $data = $request->all();
        $builder = PMOC::getApproved();
        $builder = tap($builder, function ($builder) use ($request) {
            foreach ($request->all() as $parameter => $value) {
                $builder = $builder->where($parameter, $value);
            }
            return $builder;
        });
        $monthChart = MonthChart::where('year', $data['year'])
            ->where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'PMOC')
            ->with('approval')
            ->get();
        return ['data' => $builder->get(), 'month' => $monthChart];
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
        $pMOC->approval()->save([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a PMOC.')
        ]);
        $pMOC->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a PMOC.");

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
        return PMOC::findApproved($pMOC->id)->first()
            ?: response('', 404);
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
        $pMOC->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a PMOC'));

        Log::record("Updated a PMOC.");

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
        $pMOC->makeDeleteRequest();

        Log::record("Deleted a PMOC.");

        return response('', 204);
    }
}
