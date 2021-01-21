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
        $this->middleware('auth:sanctum')->except('index', 'show', 'summary');
    }

    public function summary()
    {
        $profiles = MigrationStatistic::getApproved()->get();

        $data = [];

        foreach ($profiles as $profile) {
            if (!in_array($profile->municipality, array_keys($data))) {
                $data[$profile->municipality] = [];
            }
            $data[$profile->municipality][] = $profile;
        }
        return array_values($data);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = $request->all();
        $builder = MigrationStatistic::getApproved();
        $monthChart = MonthChart::where('year', $data['year'])
            ->where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'Migration')
            ->with('approval')
            ->get();

        $incidence = Incidence::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'Migration')
            ->orderBy('year', 'ASC')
            ->with('approval')
            ->get();

        $result = tap($builder, function ($builder) use ($request) {
            foreach ($request->all() as $parameter => $value) {
                $builder = $builder->where($parameter, $value);
            }
            return $builder;
        })->first();
        return [
            'data' => $result,
            'month' => $monthChart,
            'incidence' => $incidence
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'municipality' => ['required', 'string', 'max:255'],
            'barangay' => ['required', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'total_in_migrations' => ['nullable', 'numeric'],
            'total_out_migrations' => ['nullable', 'numeric'],
            'net_migrations' => ['nullable', 'numeric'],
        ]);

        $migrationStatistic = MigrationStatistic::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();

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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\MigrationStatistic  $migrationStatistic
     * @return \Illuminate\Http\Response
     */
    public function show(MigrationStatistic $migrationStatistic)
    {
        return MigrationStatistic::findApproved($migrationStatistic->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\MigrationStatistic  $migrationStatistic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MigrationStatistic $migrationStatistic)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'date_format:Y'],
            'total_in_migrations' => ['nullable', 'numeric'],
            'total_out_migrations' => ['nullable', 'numeric'],
            'net_migrations' => ['nullable', 'numeric'],
        ]);

        $migrationStatistic->update($data);
        $migrationStatistic->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a migration statistic.'));

        Log::record("Updated a migration statistic.");

        return $migrationStatistic;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\MigrationStatistic  $migrationStatistic
     * @return \Illuminate\Http\Response
     */
    public function destroy(MigrationStatistic $migrationStatistic)
    {
        $migrationStatistic->makeDeleteRequest();

        Log::record("Deleted a migration statistic.");

        return response('', 204);
    }
}
