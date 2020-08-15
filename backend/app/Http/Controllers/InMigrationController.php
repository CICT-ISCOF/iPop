<?php

namespace App\Http\Controllers;

use App\InMigration;
use App\Log;
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
        return InMigration::paginate(10);
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
        return InMigration::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\InMigration  $inMigration
     * @return \Illuminate\Http\Response
     */
    public function show(InMigration $inMigration)
    {
        return $inMigration;
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
