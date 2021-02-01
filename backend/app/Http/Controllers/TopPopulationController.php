<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\TopPopulation;
use Illuminate\Http\Request;

class TopPopulationController extends Controller
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
        return TopPopulation::getApproved()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $topPopulation = TopPopulation::first();
        if ($topPopulation) {
            $topPopulation->update($data);
            $topPopulation->approval->update([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to update a top population.')
            ]);
        } else {
            $topPopulation = TopPopulation::create($data);
            $topPopulation->approval()->create([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a top population.')
            ]);
        }

        Log::record('User created a top population.');
        return $topPopulation;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TopPopulation  $topPopulation
     * @return \Illuminate\Http\Response
     */
    public function show(TopPopulation $topPopulation)
    {
        return TopPopulation::findApproved($topPopulation)
            ->first() ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TopPopulation  $topPopulation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TopPopulation $topPopulation)
    {
        return response('', 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TopPopulation  $topPopulation
     * @return \Illuminate\Http\Response
     */
    public function destroy(TopPopulation $topPopulation)
    {
        $topPopulation->makeDeleteRequest();

        return response('', 204);
    }
}
