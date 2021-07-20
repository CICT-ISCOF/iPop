<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Incidence;
use App\Models\Log;
use App\Models\MonthChart;
use App\Models\Role;
use App\Models\Statistics\BirthStatistic;
use Illuminate\Http\Request;

class BirthStatisticController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('store', 'update', 'destroy');
    }

    public function summary()
    {
        $stats = BirthStatistic::getApproved()->get();

        $data = [
            'total_live_births' => 0,
            'crude_birth_rate' => 0,
            'general_fertility_rate' => 0,
            'incidences' => Incidence::where('type', 'Birth')->get(),
            'total' => $stats->count(),
        ];

        foreach ($stats as $stat) {
            $data['total_live_births'] += (int)$stat->total_live_births;
            $data['crude_birth_rate'] += (int)$stat->crude_birth_rate;
            $data['general_fertility_rate'] += (int)$stat->general_fertility_rate;
        }

        return $data;
    }

    public function index(Request $request)
    {
        $data = $request->all();
        $builder = BirthStatistic::getApproved();
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
        $monthChart = $builder->where('year',$data['year']) ->where('type', 'Birth')->with('approval')->get();;
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
        return [ 'data' => $result,  'month' => $monthChart,  'incidence' => $incidence  ];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'total_live_births' => ['nullable', 'numeric'],
            'crude_birth_rate' => ['required', 'string', 'max:255'],
            'general_fertility_rate' => ['required', 'string', 'max:255'],
        ]);
        $builder = new BirthStatistic();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                    $builder = $builder->whereNull( $key ); 
                }else{
                    $builder = $builder->where( $key, $value );
                }
            }
        }
        $birthStatistic =  $builder->where('year',$data['year'])->first();
        if ($birthStatistic) {
            $birthStatistic->update($data);
            $birthStatistic->setApprovalMessage($request->user()->makeMessage('wants to update a birth statistic.'));
            Log::record("Updated a birth statistic.");
        } else {
            $birthStatistic = BirthStatistic::create($data);
            $birthStatistic->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add an a birth statistic.'),
            ]));
            Log::record("Created a birth statistic.");
        }
        $birthStatistic->setApproved($request->user()->hasRole(Role::ADMIN));
        return $birthStatistic;
    }

    public function show(Request $request, $id)
    {
        $birthStatistic = BirthStatistic::findOrFail($id);
        $builder = BirthStatistic::findApproved($birthStatistic->id);
        $params = $request->only(['municipality', 'barangay', 'year']);
        foreach ($params as $key => $value) {
            $builder = $builder->where($key, $value);
        }
        return $builder->first() ?: response('', 404);
    }

    public function update(Request $request, $id)
    {
        $birthStatistic = BirthStatistic::findOrFail($id);
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'date_format:Y'],
            'gender' => ['nullable', 'string'],
            'total_live_births' => ['nullable', 'numeric'],
            'crude_birth_rate' => ['nullable', 'string', 'max:255'],
            'general_fertility_rate' => ['nullable', 'string', 'max:255'],
        ]);

        $birthStatistic->update($data);
        $birthStatistic->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a birth statistic.'));

        Log::record("Updated a birth statistic.");

        return $birthStatistic;
    }

    public function destroy($id)
    {
        $birthStatistic = BirthStatistic::findOrFail($id);
        $birthStatistic->makeDeleteRequest();

        Log::record("Deleted a birth statistic.");

        return response('', 204);
    }
}
