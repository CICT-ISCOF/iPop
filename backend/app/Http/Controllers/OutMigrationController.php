<?php

namespace App\Http\Controllers;

use App\OutMigration;
use App\Log;
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
        return OutMigration::paginate(10);
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
        return OutMigration::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\OutMigration  $outMigration
     * @return \Illuminate\Http\Response
     */
    public function show(OutMigration $outMigration)
    {
        return $outMigration;
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
