<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\PMCCS;
use App\Models\Role;
use Illuminate\Http\Request;

class PMCCSController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $builder = PMCCS::getApproved();
        foreach ($request->all() as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $builder = new PMCCS();
        foreach ($request->all() as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $model = $builder->first();
        if ($model) {
            $model->update($data);
            $model->setApprovalMessage($request->user()->makeMessage('wants to update a Percentage Distribution of PMC Applicants by Civil Status Chart.'));
        } else {
            $model = PMCCS::create($data);
            $model->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a Percentage Distribution of PMC Applicants by Civil Status Chart')
            ]));
        }
        $model->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record('Customized a Percentage Distribution of PMC Applicants by Civil Status Chart');
        return $model;
    }

    public function show($id)
    {
        return PMCCS::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PMCCS::findOrFail($id);
        $model->update($request->all());
        return $model;
    }

    public function destroy($id)
    {
        $model = PMCCS::findOrFail($id);
        $model->delete();
        return response('', 204);
    }
}
