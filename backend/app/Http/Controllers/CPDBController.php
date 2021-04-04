<?php

namespace App\Http\Controllers;

use App\Models\CPDB;
use App\Models\Log;
use App\Models\Record;
use App\Events\RecordSaved;
use App\Models\Role;
use Exception;
use Illuminate\Http\Request;

class CPDBController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = CPDB::with('record.user.profilePicture')
            ->with('comments.user.profilePicture');

        return $builder->paginate(10);
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
        // broadcast(new RecordSaved($cpdb))->toOthers();
        return $cpdb;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $builder = CPDB::with('record.user.profilePicture')
            ->with('comments.user.profilePicture');

        return $builder->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param CPDB $cpdb
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CPDB $cpdb)
    {
        Log::record('Updated a CPDB record.');
        $cpdb->update($request->all());
        $cpdb->record->update(['status' => 'Requires Revalidation']);
        return $cpdb;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param CPDB $cpdb
     * @return \Illuminate\Http\Response
     * @throws Exception
     */
    public function destroy(CPDB $cpdb)
    {
        Log::record('Deleted a CPDB record.');
        $cpdb->delete();
        return response('', 204);
    }
}
