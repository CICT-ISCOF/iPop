<?php

namespace App\Http\Controllers;

use App\Models\AgeDistribution_AgeDependencyRatio;
use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class AgeDistributionAgeDependencyRatioController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('store', 'destroy');
    }

    public function index(Request $request)
    {
        $data = $request->all();
        $builder = AgeDistribution_AgeDependencyRatio::getApproved();
        foreach ($data as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        return  $builder->where('year', $data['year'])->get();
    }

    public function show(Request $request, $id)
    {
        $data = $request->all();
        return AgeDistribution_AgeDependencyRatio::getApproved()
            ->where('year', $data['year'])
            ->whereNotNull('municipality')
            ->whereNull('barangay')
            ->orderBy('municipality', 'asc')
            ->findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'year' => ['required', 'numeric'],
            'hh_population' => ['required', 'numeric'],
            '0-14' => ['required', 'numeric'],
            '15-64' => ['nullable', 'numeric'],
            '65_and_over' => ['nullable', 'numeric'],
            'young_dependency' => ['nullable', 'numeric'],
            'old_dependency' => ['nullable', 'numeric'],
            'dependency' => ['nullable', 'numeric'],
        ]);

        $data = $request->all();
        $builder = AgeDistribution_AgeDependencyRatio::getApproved();
        foreach ($data as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $model = $builder->where('year', $data['year'])->first();
        if ($model) {
            $model->update($data);
            $model->setApprovalMessage($request->user()->makeMessage('wants to update an Age Distribution and Age Dependency Ratio.'));
            $model->setApproved($request->user()->hasRole(Role::ADMIN));
            Log::record("Updated an Age Distribution and Age Dependency Ratio.");
        } else {
            $model = AgeDistribution_AgeDependencyRatio::create($data);
            $model->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add an Age Distribution and Age Dependency Ratio.'),
                'approved' => $request->user()->hasRole(Role::ADMIN),
            ]));
            Log::record("Created an Age Distribution and Age Dependency Ratio.");
        }
        return $model;
    }


    public function destroy($id)
    {
        AgeDistribution_AgeDependencyRatio::find($id)->delete();
        return response('', 204);
    }
}
