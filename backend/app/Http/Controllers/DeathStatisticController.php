<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use App\Models\Statistics\DeathStatistic;
use Illuminate\Http\Request;

class DeathStatisticController extends Controller
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
    public function index()
    {
        return DeathStatistic::getApproved()->paginate(10);
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
        ]);

        $deathStatistic = DeathStatistic::create($data);
        $deathStatistic->approval()->save(new Approval(['requester_id' => $request->user()->id]));
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
        ]);

        $deathStatistic->update($data);
        $deathStatistic->setApproved($request->user()->hasRole(Role::ADMIN));

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
