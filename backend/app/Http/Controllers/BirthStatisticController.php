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
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = $request->all();
        $builder = BirthStatistic::getApproved();
        $monthChart = MonthChart::where('year', $data['year'])
            ->where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'Birth')
            ->with('approval')
            ->get();

        $incidence = Incidence::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('type', 'Birth')
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
            'gender' => ['required', 'string'],
            'total_live_births' => ['nullable', 'numeric'],
            'crude_birth_rate' => ['required', 'string', 'max:255'],
            'general_fertility_rate' => ['required', 'string', 'max:255'],
        ]);

        $birthStatistic = BirthStatistic::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();

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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\BirthStatistic  $birthStatistic
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, BirthStatistic $birthStatistic)
    {
        $builder = BirthStatistic::findApproved($birthStatistic->id);
        $params = $request->only(['municipality', 'barangay', 'year']);
        foreach ($params as $key => $value) {
            $builder = $builder->where($key, $value);
        }
        return $builder->first() ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\BirthStatistic  $birthStatistic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BirthStatistic $birthStatistic)
    {
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\BirthStatistic  $birthStatistic
     * @return \Illuminate\Http\Response
     */
    public function destroy(BirthStatistic $birthStatistic)
    {
        $birthStatistic->makeDeleteRequest();

        Log::record("Deleted a birth statistic.");

        return response('', 204);
    }
}
