<?php

namespace App\Http\Controllers;

use App\Models\Approval;
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
    public function index()
    {
        return BirthStatistic::getApproved()->paginate(10);
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
            'total_live_births' => ['nullable', 'numeric'],
            'crude_death_rate' => ['required', 'string', 'max:255'],
            'general_fertility_rate' => ['required', 'string', 'max:255'],
        ]);

        $birthStatistic = BirthStatistic::create($data);
        $birthStatistic->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $birthStatistic->setApproved($request->user()->hasRole(Role::ADMIN));

        return $birthStatistic;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\BirthStatistic  $birthStatistic
     * @return \Illuminate\Http\Response
     */
    public function show(BirthStatistic $birthStatistic)
    {
        return BirthStatistic::findApproved($birthStatistic->id)->first() || response('', 404);
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
            'male' => ['nullable', 'numeric'],
            'female' => ['nullable', 'numeric'],
            'total_live_births' => ['nullable', 'numeric'],
            'crude_death_rate' => ['nullable', 'string', 'max:255'],
            'general_fertility_rate' => ['nullable', 'string', 'max:255'],
        ]);

        $birthStatistic->update($data);
        $birthStatistic->setApproved($request->user()->hasRole(Role::ADMIN));

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
        $birthStatistic->delete();

        return response('', 204);
    }
}
