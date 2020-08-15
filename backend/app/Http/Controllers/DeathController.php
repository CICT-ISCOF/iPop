<?php

namespace App\Http\Controllers;

use App\Death;
use App\Http\Requests\DeathRequest;
use App\Http\Requests\DeathUpdateRequest;
use Illuminate\Http\Request;

class DeathController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Death::paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\DeathRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DeathRequest $request)
    {
        return Death::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function show(Death $death)
    {
        return $death;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\DeathUpdateRequest  $request
     * @param  \App\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function update(DeathUpdateRequest $request, Death $death)
    {
        $death->update($request->validated());
        return $death;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function destroy(Death $death)
    {
        $death->delete();
        return response('', 204);
    }
}
