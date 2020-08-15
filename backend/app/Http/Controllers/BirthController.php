<?php

namespace App\Http\Controllers;

use App\Birth;
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
        $birth->delete();
        return response('', 204);
    }
}
