<?php

namespace App\Http\Controllers;

use App\OutMigration;
use App\Log;
use App\Record;
use App\Http\Requests\OutMigrationRequest;
use App\Http\Requests\OutMigrationUpdateRequest;
use Illuminate\Http\Request;

class OutMigrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OutMigration::with('record.user')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\OutMigrationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OutMigrationRequest $request)
    {
        Log::record('Created an Out-Migration record.');
        $outMigration = OutMigration::create($request->validated());
        $record = new Record([
            'user_id' => $request->user()->id,
            'status' => 'Pending'
        ]);
        $outMigration->record()->save($record);
        return $outMigration;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return OutMigration::with('record.user')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\OutMigrationUpdateRequest  $request
     * @param  \App\OutMigration  $outMigration
     * @return \Illuminate\Http\Response
     */
    public function update(
        OutMigrationUpdateRequest $request,
        OutMigration $outMigration
    ) {
        Log::record('Updated an Out-Migration record.');
        $outMigration->update($request->validated());
        $outMigration->record->update([
            'status' => 'Requires Revalidation'
        ]);
        return $outMigration;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\OutMigration  $outMigration
     * @return \Illuminate\Http\Response
     */
    public function destroy(OutMigration $outMigration)
    {
        Log::record('Deleted an Out-Migration record.');
        $outMigration->delete();
        return response('', 204);
    }
}
