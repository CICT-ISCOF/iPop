<?php

namespace App\Http\Controllers;

use App\cpdb;
use App\Log;
use App\Record;
use Illuminate\Http\Request;

class cpdbController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CPDB::with('record.user')
            ->with('comments.user')
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Log::record('Created new cpdb record.');
        $cpdb =  cpdb::create($request->all());
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
        return CPDB::with('record.user')
            ->with('comments.user')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CPDB  $cpdb
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CPDB $cpdb)
    {
        Log::record('Updated a cpdb record.');
        $cpdb->update($request->all());
        $cpdb->record->update(['status' => 'Requires Revalidation']);
        return $cpdb;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CPDB  $cpdb
     * @return \Illuminate\Http\Response
     */
    public function destroy(CPDB $cpdb)
    {
        Log::record('Deleted a cpdb record.');
        $cpdb->delete();
        return response('', 204);
    }
}
