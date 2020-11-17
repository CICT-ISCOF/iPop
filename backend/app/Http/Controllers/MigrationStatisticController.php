<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Role;
use App\Models\Statistics\MigrationStatistic;
use Illuminate\Http\Request;

class MigrationStatisticController extends Controller
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
        return MigrationStatistic::getApproved()->paginate(10);
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
            'municipality' => ['required', 'string', 'max:255'],
            'barangay' => ['required', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'total_in_migrations' => ['nullable', 'numeric'],
            'total_out_migrations' => ['nullable', 'numeric'],
            'net_migrations' => ['nullable', 'numeric'],
        ]);

        $migrationStatistic = MigrationStatistic::create($data);
        $migrationStatistic->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $migrationStatistic->setApproved($request->user()->hasRole(Role::ADMIN));

        return $migrationStatistic;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\MigrationStatistic  $migrationStatistic
     * @return \Illuminate\Http\Response
     */
    public function show(MigrationStatistic $migrationStatistic)
    {
        return MigrationStatistic::findApproved($migrationStatistic->id) || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\MigrationStatistic  $migrationStatistic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MigrationStatistic $migrationStatistic)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'date_format:Y'],
            'total_in_migrations' => ['nullable', 'numeric'],
            'total_out_migrations' => ['nullable', 'numeric'],
            'net_migrations' => ['nullable', 'numeric'],
        ]);

        $migrationStatistic->update($data);
        $migrationStatistic->setApproved($request->user()->hasRole(Role::ADMIN));

        return $migrationStatistic;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\MigrationStatistic  $migrationStatistic
     * @return \Illuminate\Http\Response
     */
    public function destroy(MigrationStatistic $migrationStatistic)
    {
        $migrationStatistic->delete();

        return response('', 204);
    }
}
