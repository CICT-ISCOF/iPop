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

    public function index(Request $request)
    {
        $builder = PMOC::getApproved();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                    $builder = $builder->whereNull( $key ); 
                }else{
                    $builder = $builder->where( $key, $value );
                }
            }
        }
        $result = $builder->first();
        $builder = new MonthChart();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                    $builder = $builder->whereNull( $key ); 
                }else{
                    $builder = $builder->where( $key, $value );
                }
            }
        }
        $monthChart = $builder->where('type', 'PMOC')->with('approval')->get();
        return ['data' => $result, 'month' => $monthChart];
    }

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

    public function show(PMOC $pMOC)
    {
        return PMOC::findApproved($pMOC->id)->first() ?: response('', 404);
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $pMOC = PMOC::findOrFail($id);
        $pMOC->update($data);
        $pMOC->setApproved($request->user()->hasRole(Role::ADMIN))->setApprovalMessage($request->user()->makeMessage('wants to update a PMOC'));
        Log::record("Updated a PMOC.");
        return $pMOC;
    }

    public function destroy($id)
    {
        $pMOC = PMOC::findOrFail($id);
        $pMOC->makeDeleteRequest();
        Log::record("Deleted a PMOC.");
        return response('', 204);
    }
}
