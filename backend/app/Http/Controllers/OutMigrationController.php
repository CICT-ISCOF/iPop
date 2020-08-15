<?php

namespace App\Http\Controllers;

use App\OutMigration;
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
        $outMigration->delete();
        return response('', 204);
    }
}
