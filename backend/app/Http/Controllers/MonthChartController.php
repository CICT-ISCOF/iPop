<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\MonthChart;
use App\Models\Role;
use Illuminate\Http\Request;

class MonthChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = MonthChart::getApproved();
        $builder = tap($builder, function ($builder) use ($request) {
            foreach ($request->all() as $parameter => $value) {
                $builder = $builder->where($parameter, $value);
            }
            return $builder;
        });
        return $builder->get();
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
        $results = [];

        foreach ($data['months'] as $month => $value) {
            $temp = $data;
            $temp['month'] = $month;
            $temp[strtolower($data['gender']) + 's'] = $value;
            $monthChart = MonthChart::where('year', $temp['year'])
                ->where('municipality', $temp['municipality'])
                ->where('barangay', $temp['barangay'])
                ->where('month', $month)
                ->with('approval')
                ->first();

            if ($monthChart) {
                $monthChart->update($temp);
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MonthChart  $monthChart
     * @return \Illuminate\Http\Response
     */
    public function show(MonthChart $monthChart)
    {
        return MonthChart::findApproved($monthChart->id) ?: response('', 204);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MonthChart  $monthChart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MonthChart $monthChart)
    {
        $monthChart->update($request->all());
        $monthChart->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a month chart.'));

        Log::record("Updated a month chart.");

        return $monthChart;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MonthChart  $monthChart
     * @return \Illuminate\Http\Response
     */
    public function destroy(MonthChart $monthChart)
    {
        $monthChart->makeDeleteRequest();

        return response('', 204);
    }
}
