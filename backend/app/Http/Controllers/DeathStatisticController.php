<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Incidence;
use App\Models\Log;
use App\Models\MonthChart;
use App\Models\Role;
use App\Models\Statistics\DeathStatistic;
use Illuminate\Http\Request;

class DeathStatisticController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show', 'summary','byMunicipality');
    }

    public function summary(Request $request)
    {
        $data = $request->all();
        return json_encode([
            'summary' => DeathStatistic::getApproved()
                ->whereNull('barangay')
                ->whereNull('municipality')
                ->where('year',$data['year'])
                ->first(),
            'crude_death_rate' => Incidence::getApproved()
                ->whereNull('barangay')
                ->whereNull('municipality')
                ->where('year',$data['year'])
                ->where('type', 'Death')
                ->where('title','Crude Death Rate')
                ->first(),
        ]);
    }
    
    public function byMunicipality(Request $request)
    {
        $data = $request->all();
        return DeathStatistic::getApproved()
            ->where('year',$data['year'])
            ->whereNotNull('municipality')
            ->whereNull('barangay')
            ->orderBy('municipality','asc')
            ->get();
    }

    public function index(Request $request)
    {
        $data = $request->all();
        $builder = DeathStatistic::getApproved();
        foreach ($request->all() as $key => $value) {
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
        foreach ($request->all() as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $monthChart = $builder->where('year', $data['year'])->where('type', 'Death')->with('approval')->get();;
        $builder = new Incidence();
        foreach ($request->all() as $key => $value) {
            if ($key === 'barangay' || $key === 'municipality') {
                if ($value === 'null') {
                    $builder = $builder->whereNull($key);
                } else {
                    $builder = $builder->where($key, $value);
                }
            }
        }
        $incidence =  $builder->where('type', 'Death')->orderBy('year', 'ASC')->with('approval')->get();
        return [
            'data' => $result,
            'month' => $monthChart,
            'incidence' => $incidence
        ];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'population' => ['required', 'numeric'],
            'crude_death_rate' => ['required', 'numeric'],
            'total' => ['required', 'numeric'],
        ]);
        $builder = new DeathStatistic();
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
            $deathStatistic = DeathStatistic::create($data);
            $deathStatistic->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a death statistic.'),
            ]));
        }

        $deathStatistic->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("Created a death statistic.");
        return $deathStatistic;
    }

    public function show(DeathStatistic $deathStatistic)
    {
        return DeathStatistic::findApproved($deathStatistic->id)->first()
            ?: response('', 404);
    }

    public function update(Request $request, DeathStatistic $deathStatistic)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'date_format:Y'],
            'male' => ['nullable', 'numeric'],
            'female' => ['nullable', 'numeric'],
            'crude_death_rate' => ['nullable', 'string', 'max:255'],
            'total' => ['nullable', 'string', 'max:255'],
        ]);

        $deathStatistic->update($data);
        $deathStatistic->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a death statistic.'));
        Log::record("Updated a death statistic.");
        return $deathStatistic;
    }

    public function destroy(DeathStatistic $deathStatistic)
    {
        $deathStatistic->makeDeleteRequest();
        Log::record("Deleted a death statistic.");
        return response('', 204);
    }
}
