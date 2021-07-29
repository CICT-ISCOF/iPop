<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Incidence;
use App\Models\Log;
use App\Models\MonthChart;
use App\Models\Role;
use App\Models\Statistics\MigrationStatistic;
use Illuminate\Http\Request;

class MigrationStatisticController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show', 'summary','byMunicipality','migrationChart');
    }
    
    public function migrationChart()
    {
        return  MigrationStatistic::whereNull('barangay')
            ->whereNull('municipality')
            ->whereNotNull('year')
            ->orderBy('year','asc')
            ->get();
    }
    
    public function summary(Request $request)
    {
        $data = $request->all();
        return json_encode([
            'summary' => MigrationStatistic::getApproved()
                ->whereNull('barangay')
                ->whereNull('municipality')
                ->where('year',$data['year'])
                ->first(),
        ]);
    }
    
    public function byMunicipality(Request $request)
    {
        $data = $request->all();
        return MigrationStatistic::getApproved()
            ->where('year',$data['year'])
            ->whereNotNull('municipality')
            ->whereNull('barangay')
            ->orderBy('municipality','asc')
            ->get();
    }

    public function index(Request $request)
    {
        $data = $request->all();
        $builder = MigrationStatistic::getApproved();
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
        $monthChart = $builder->where('year',$data['year']) ->where('type', 'Migration')->with('approval')->get();;
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
        $incidence =  $builder->where('year',$data['year']) ->where('type', 'Migration')->orderBy('year', 'ASC')->with('approval')->get();
        return [ 'data' => $result,  'month' => $monthChart,  'incidence' => $incidence  ];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'total_population' => ['nullable', 'numeric'],
            'total_in_migrations' => ['required', 'numeric'],
            'total_out_migrations' => ['required', 'numeric'],
            'net_migrations' => ['required', 'numeric'],
        ]);
        $builder = new MigrationStatistic();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                    $builder = $builder->whereNull( $key ); 
                }else{
                    $builder = $builder->where( $key, $value );
                }
            }
        }
        $migrationStatistic =  $builder->where('year',$data['year'])->first();
        if ($migrationStatistic) {
            $migrationStatistic->update($data);
        } else {
            $migrationStatistic = MigrationStatistic::create($data);
            $migrationStatistic->approval()->save(new Approval([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add migration statistic.'),
            ]));
        }
        $migrationStatistic->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("Created a migration statistic.");
        return $migrationStatistic;
    }

    public function show(MigrationStatistic $migrationStatistic)
    {
        return MigrationStatistic::findApproved($migrationStatistic->id)->first()
            ?: response('', 404);
    }

    public function update(Request $request, MigrationStatistic $migrationStatistic)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'total_population' => ['required', 'numeric'],
            'total_in_migrations' => ['required', 'numeric'],
            'total_out_migrations' => ['required', 'numeric'],
            'net_migrations' => ['required', 'numeric'],
        ]);
        $migrationStatistic->update($data);
        $migrationStatistic->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a migration statistic.'));
        Log::record("Updated a migration statistic.");
        return $migrationStatistic;
    }

    public function destroy(MigrationStatistic $migrationStatistic)
    {
        $migrationStatistic->makeDeleteRequest();
        Log::record("Deleted a migration statistic.");
        return response('', 204);
    }
}
