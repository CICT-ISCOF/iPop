<?php

namespace App\Http\Controllers;

use App\Models\StatisticNote;
use Illuminate\Http\Request;

class StatisticNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StatisticNote::all();
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
            'description' => ['required', 'string']
        ]);

        return StatisticNote::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\StatisticNote  $statisticNote
     * @return \Illuminate\Http\Response
     */
    public function show(StatisticNote $statisticNote)
    {
        return $statisticNote;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\StatisticNote  $statisticNote
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StatisticNote $statisticNote)
    {
        $statisticNote->update($request->only(['name', 'description']));

        return $statisticNote;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\StatisticNote  $statisticNote
     * @return \Illuminate\Http\Response
     */
    public function destroy(StatisticNote $statisticNote)
    {
        $statisticNote->delete();
        return response('', 204);
    }
}
