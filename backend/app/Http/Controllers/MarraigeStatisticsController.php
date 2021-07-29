<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\MarraigeStatistics;
use App\Models\MonthChart;
use App\Models\Role;
use Illuminate\Http\Request;

class MarraigeStatisticsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show', 'summary','byMunicipality');
    }
    
    public function summary(Request $request)
    {
        $data = $request->all();
        return json_encode([
            'summary' => MarraigeStatistics::getApproved()
                ->whereNull('barangay')
                ->whereNull('municipality')
                ->where('year',$data['year'])
                ->first(),
            'month' =>   MarraigeStatistics::getApproved()
                ->whereNull('barangay')
                ->whereNull('municipality')
                ->whereNotNull('year')
                ->orderBy('year','asc')
                ->get()
        ]);
    }
    
    public function byMunicipality(Request $request)
    {
        $data = $request->all();
        return MarraigeStatistics::getApproved()
            ->where('year',$data['year'])
            ->whereNotNull('municipality')
            ->whereNull('barangay')
            ->orderBy('municipality','asc')
            ->get();
    }
    
    public function index(Request $request)
    {
        $data = $request->all();
        $builder = MarraigeStatistics::getApproved();
        foreach ($data as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $result =  $builder->where('year', $data['year'])->first();
        $builder = new MonthChart();
        foreach ($data as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $monthChart = $builder->where('year', $data['year'])->where('type', 'Marriage')->with('approval')->get();;
        return [
            'data' => $result,
            'month' => $monthChart,
        ];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'population' => ['required', 'numeric'],
            'total_marriages' => ['required', 'numeric'],
            'church' => ['required', 'numeric'],
            'civil' => ['required', 'numeric'],
            'others' => ['required', 'numeric'],
        ]);
        $builder = new MarraigeStatistics();
        foreach ($request->all() as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $deathStatistic =  $builder->where('year', $data['year'])->first();
        if ($deathStatistic) {
            $deathStatistic->update($data);
        } else {
            $deathStatistic = MarraigeStatistics::create($data);
            $deathStatistic->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a Marriage Profile.'),
            ]));
        }

        $deathStatistic->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("Created a Marriage Profile.");
        return $deathStatistic;
    }

   
    public function destroy(MarraigeStatistics $marraigeStatistics)
    {
        $marraigeStatistics->makeDeleteRequest();
        Log::record("Deleted a Marriage Profile.");
        return response('', 204);
    }
}
