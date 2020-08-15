<?php

namespace App\Http\Controllers;

use App\Birth;
use App\Log;
use App\Http\BirthRequest;
use App\Http\BirthUpdateRequest;
use Illuminate\Http\Request;

class BirthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Birth::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\BirthRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BirthRequest $request)
    {
        Log::record('Created new Birth record.');
        return Birth::create($request->validate());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Birth  $birth
     * @return \Illuminate\Http\Response
     */
    public function show(Birth $birth)
    {
        return $birth;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\BirthUpdateRequest  $request
     * @param  \App\Birth  $birth
     * @return \Illuminate\Http\Response
     */
    public function update(BirthUpdateRequest $request, Birth $birth)
    {
        Log::record('Updated a birth record.');
        $birth->update($request->validated());
        return $birth;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Birth  $birth
     * @return \Illuminate\Http\Response
     */
    public function destroy(Birth $birth)
    {
        Log::record('Deleted a birth record.');
        $birth->delete();
        return response('', 204);
    }
}
