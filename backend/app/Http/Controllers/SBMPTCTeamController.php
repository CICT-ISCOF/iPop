<?php

namespace App\Http\Controllers;

use App\Models\SBMPTCTeam;
use Illuminate\Http\Request;

class SBMPTCTeamController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SBMPTCTeam::paginate(10);
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
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
        ]);

        return SBMPTCTeam::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SBMPTCTeam $team
     * @return \Illuminate\Http\Response
     */
    public function show(SBMPTCTeam $team)
    {
        return $team;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMPTCTeam $team
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SBMPTCTeam $team)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
        ]);

        $team->update($data);
        return $team;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMPTCTeam $team
     * @return \Illuminate\Http\Response
     */
    public function destroy(SBMPTCTeam $team)
    {
        $team->delete();
        return response('', 204);
    }
}
