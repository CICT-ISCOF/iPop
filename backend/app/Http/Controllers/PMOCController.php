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
        $data = $request->all();

        $pMOC = PMOC::create($data);
        $pMOC->approval()->create([
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
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $pMOC = PMOC::findOrFail($id);
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
    public function destroy($id)
    {
        $pMOC = PMOC::findOrFail($id);

        $pMOC->makeDeleteRequest();

        Log::record("Deleted a PMOC.");

        return response('', 204);
    }
}
