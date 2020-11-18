<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Role;
use App\Models\Statistics\MigrationRate;
use Illuminate\Http\Request;

class MigrationRateController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MigrationRate::getApproved()->paginate(10);
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
            'month' => ['required', 'date_format:m'],
            'year' => ['required', 'date_format:Y'],
            'value' => ['required', 'numeric'],
        ]);

        $migrationRate = MigrationRate::create($data);
        $migrationRate->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $migrationRate->setApproved($request->user()->hasRole(Role::ADMIN));

        return $migrationRate;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\MigrationRate  $migrationRate
     * @return \Illuminate\Http\Response
     */
    public function show(MigrationRate $migrationRate)
    {
        return MigrationRate::findApproved($migrationRate->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\MigrationRate  $migrationRate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MigrationRate $migrationRate)
    {
        $data = $request->validate([
            'month' => ['nullable', 'date_format:m'],
            'year' => ['nullable', 'date_format:Y'],
            'value' => ['nullable', 'numeric'],
        ]);

        $migrationRate->update($data);
        $migrationRate->setApproved($request->user()->hasRole(Role::ADMIN));

        return $migrationRate;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\MigrationRate  $migrationRate
     * @return \Illuminate\Http\Response
     */
    public function destroy(MigrationRate $migrationRate)
    {
        $migrationRate->delete();

        return response('', 204);
    }
}
