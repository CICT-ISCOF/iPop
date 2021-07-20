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
        $this->middleware('auth:sanctum')->except('index', 'show', 'summary');
    }

    public function summary()
    {
        $stats = DeathStatistic::getApproved()->get();
        $data = [
            'male' => 0,
            'female' => 0,
            'crude_death_rate' => 0,
            'total' => 0,
            'incidences' => Incidence::where('type', 'Death')->get(),
        ];
        foreach ($stats as $stat) {
            $data['male'] += (int)$stat->male;
            $data['female'] += (int)$stat->female;
            $data['crude_death_rate'] += (int)$stat->crude_death_rate;
            $data['total'] += (int)$stat->total;
        }
        return $data;
    }

    public function index(Request $request)
    {
        $data = $request->all();
        $builder = DeathStatistic::getApproved();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                     $builder = $builder->whereNull( $key ); 
                }else{
                     $builder = $builder->where( $key, $value );
                }
            }
        }
        $result =  $builder->where('year',$data['year'])->first();
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
        $monthChart = $builder->where('year',$data['year']) ->where('type', 'Death')->with('approval')->get();;
        $builder = new Incidence();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                     $builder = $builder->whereNull( $key ); 
                }else{
                     $builder = $builder->where( $key, $value );
                }
            }
        }
        $incidence =  $builder->where('year',$data['year']) ->where('type', 'Birth')->orderBy('year', 'ASC')->with('approval')->get();
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
            'male' => ['nullable', 'numeric'],
            'female' => ['nullable', 'numeric'],
            'crude_death_rate' => ['required', 'string', 'max:255'],
            'total' => ['required', 'string', 'max:255'],
        ]);
        $builder = new DeathStatistic();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                    $builder = $builder->whereNull( $key ); 
                }else{
                    $builder = $builder->where( $key, $value );
                }
            }
        }
        $deathStatistic =  $builder->where('year',$data['year'])->first();
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
