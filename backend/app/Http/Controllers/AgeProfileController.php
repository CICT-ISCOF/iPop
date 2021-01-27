<?php

namespace App\Http\Controllers;

use App\Models\AgeProfile;
use Illuminate\Http\Request;

class AgeProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AgeProfile::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return AgeProfile::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AgeProfile  $ageProfile
     * @return \Illuminate\Http\Response
     */
    public function show(AgeProfile $ageProfile)
    {
        return $ageProfile;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AgeProfile  $ageProfile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AgeProfile $ageProfile)
    {
        $ageProfile->update($request->all());

        return $ageProfile;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AgeProfile  $ageProfile
     * @return \Illuminate\Http\Response
     */
    public function destroy(AgeProfile $ageProfile)
    {
        $ageProfile->delete();

        return response('', 204);
    }
}
