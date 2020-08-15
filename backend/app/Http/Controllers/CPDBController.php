<?php

namespace App\Http\Controllers;

use App\CPDB;
use App\Log;
use Illuminate\Http\Request;

class CPDBController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CPDB::paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Log::record('Created new CPDB record.');
        return CPDB::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CPDB  $cPDB
     * @return \Illuminate\Http\Response
     */
    public function show(CPDB $cPDB)
    {
        return $cPDB;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CPDB  $cPDB
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CPDB $cPDB)
    {
        Log::record('Updated a CPDB record.');
        $cPDB->update($request->all());
        return $cPDB;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CPDB  $cPDB
     * @return \Illuminate\Http\Response
     */
    public function destroy(CPDB $cPDB)
    {
        Log::record('Deleted a CPDB record.');
        $cPDB->delete();
        return response('', 204);
    }
}
