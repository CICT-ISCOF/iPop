<?php

namespace App\Http\Controllers;

use App\Marriage;
use App\Http\Requests\MarriageRequest;
use App\Http\Requests\MarriageUpdateRequest;
use Illuminate\Http\Request;

class MarriageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Marriage::paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\MarriageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MarriageRequest $request)
    {
        return Marriage::create($request->validate());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Marriage  $marriage
     * @return \Illuminate\Http\Response
     */
    public function show(Marriage $marriage)
    {
        return $marriage;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\MarriageUpdateRequest  $request
     * @param  \App\Marriage  $marriage
     * @return \Illuminate\Http\Response
     */
    public function update(MarriageUpdateRequest $request, Marriage $marriage)
    {
        $marriage->update($request->validated());
        return $marriage;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Marriage  $marriage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marriage $marriage)
    {
        $marriage->delete();
        return response('', 204);
    }
}
