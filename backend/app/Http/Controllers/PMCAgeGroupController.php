<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\PMCAgeGroup;
use App\Models\Role;
use Illuminate\Http\Request;

class PMCAgeGroupController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $builder =  PMCAgeGroup::getApproved();
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
        $builder = new PMCAgeGroup();
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
            $model->setApprovalMessage($request->user()->makeMessage('wants to update a pmc age group.'));
        } else {
            $model = PMCAgeGroup::create($data);
            $model->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a pmc age group.')
            ]));
        }
        $model->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record('Customized a PMC Couple Applicants by Age Group Chart');
        return $model;
    }

    public function show($id)
    {
        return PMCAgeGroup::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PMCAgeGroup::findOrFail($id);

        $model->update($request->all());

        return $model;
    }

    public function destroy($id)
    {
        $model = PMCAgeGroup::findOrFail($id);

        $model->delete();

        return response('', 204);
    }
}
