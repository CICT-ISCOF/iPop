<?php

namespace App\Http\Controllers;

use App\InMigration;
use App\Log;
use App\Record;
use App\Http\Requests\InMigrationRequest;
use App\Http\Requests\InMigrationUpdateRequest;
use Illuminate\Http\Request;

class InMigrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return InMigration::with('record.user')
            ->with('comments.user')
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\InMigrationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(InMigrationRequest $request)
    {
        Log::record('Created an In-Migration record.');
        $inMigration = InMigration::create($request->validated());
        $record = new Record([
            'user_id' => $request->user()->id,
            'status' => 'Pending'
        ]);
        $inMigration->record()->save($record);
        $inMigration->record = $record;
        return $inMigration;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return InMigration::with('record.user')
            ->with('comments.user')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\InMigrationUpdateRequest  $request
     * @param  \App\InMigration  $inMigration
     * @return \Illuminate\Http\Response
     */
    public function update(
        InMigrationUpdateRequest $request,
        InMigration $inMigration
    ) {
        Log::record('Updated an In-Migration record.');
        $inMigration->update($request->validated());
        $inMigration->record->update([
            'status' => 'Requires Revalidation'
        ]);
        return $inMigration;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\InMigration  $inMigration
     * @return \Illuminate\Http\Response
     */
    public function destroy(InMigration $inMigration)
    {
        Log::record('Deleted an In-Migration record.');
        $inMigration->delete();
        return response('', 204);
    }
}
