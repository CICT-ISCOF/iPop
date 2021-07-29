<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\MonthChart;
use App\Models\Role;
use Illuminate\Http\Request;

class MonthChartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    public function index(Request $request)
    {
        $builder = MonthChart::getApproved();

        foreach ($request->all() as $key => $value) {
            if ($value === 'null') {
                $builder = $builder->whereNull($key);
            } else {
                $builder = $builder->where($key, $value);
            }
        }

        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $results = [];

        foreach ($data['months'] as $month => $value) {
            $temp = $data;
            $temp['month'] = $month;
            $temp['males'] = $data['males'][$month];
            $temp['females'] = $data['females'][$month];
            $monthChart = [];
            $builder = new MonthChart();
            foreach ($request->all() as $key => $value) {
                if ($key === 'barangay' || $key === 'municipality') {
                    $builder = $builder->where($key, $value);
                    if ($value === 'null') {
                        $builder = $builder->whereNull($key);
                    }
                }
            }
            $monthChart =  $builder->where('year', $data['year'])->where('month', $month)->where('type',$data['type'])->first();
            if ($monthChart) {
                $monthChart->update($temp);
                $monthChart->setApprovalMessage($request->user()->makeMessage('wants to updatec a month chart.'));
            } else {
                $monthChart = MonthChart::create($temp);
                $monthChart->approval()->create([
                    'requester_id' => $request->user()->id,
                    'message' => $request->user()->makeMessage('wants to add a month chart.'),
                ]);
            }
            $monthChart->setApproved($request->user()->hasRole(Role::ADMIN));
            $results[] = $monthChart;
            Log::record("Created a month chart.");
        }

        return $results;
    }

    public function show(MonthChart $monthChart)
    {
        return MonthChart::findApproved($monthChart->id) ?: response('', 204);
    }

    public function update(Request $request, MonthChart $monthChart)
    {
        $monthChart->update($request->all());
        $monthChart->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a month chart.'));

        Log::record("Updated a month chart.");

        return $monthChart;
    }

    public function destroy(MonthChart $monthChart)
    {
        $monthChart->makeDeleteRequest();

        return response('', 204);
    }
}
