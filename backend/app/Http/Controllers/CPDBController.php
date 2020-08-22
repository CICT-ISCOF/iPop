<?php

namespace App\Http\Controllers;

use App\CPDB;
use App\Log;
use App\Record;
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
        return CPDB::with('record')->paginate(10);
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
        $cpdb =  CPDB::create($request->all());
        $record = new Record([
            'user_id' => $request->user()->id,
            'status' => 'Pending',
        ]);
        $cpdb->record()->save($record);
        $cpdb->record = $record;
        return $cpdb;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CPDB::with('record')->findOrFail($id);
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
        $cPDB->record->update(['status' => 'Requires Revalidation']);
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
