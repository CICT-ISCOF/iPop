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
        $profiles = DeathStatistic::getApproved()->get();

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
        $builder = DeathStatistic::getApproved();
        $monthChart = MonthChart::where('year', $data['year'])
            ->where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'Death')
            ->with('approval')
            ->get();

        $incidence = Incidence::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'Death')
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
            'male' => ['nullable', 'numeric'],
            'female' => ['nullable', 'numeric'],
            'crude_death_rate' => ['required', 'string', 'max:255'],
            'total' => ['required', 'string', 'max:255'],
        ]);

        $deathStatistic = DeathStatistic::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();

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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\DeathStatistic  $deathStatistic
     * @return \Illuminate\Http\Response
     */
    public function show(DeathStatistic $deathStatistic)
    {
        return DeathStatistic::findApproved($deathStatistic->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\DeathStatistic  $deathStatistic
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\DeathStatistic  $deathStatistic
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeathStatistic $deathStatistic)
    {
        $deathStatistic->makeDeleteRequest();

        Log::record("Deleted a death statistic.");

        return response('', 204);
    }
}
