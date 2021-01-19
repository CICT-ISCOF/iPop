<?php

namespace App\Http\Controllers;

use App\Models\OutMigration;
use App\Models\Log;
use App\Models\Record;
use App\Events\RecordSaved;
use App\Http\Requests\OutMigrationRequest;
use App\Http\Requests\OutMigrationUpdateRequest;
use App\Models\Role;
use Illuminate\Http\Request;

class OutMigrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = OutMigration::with('record.user.profilePicture')
            ->with('comments.user.profilePicture');
        if ($request->user()->hasRole(Role::PPO_ONE)) {
            $user = $request->user();
            $builder = $builder->where('municipality', $user->municipality)
                ->where('barangay', $user->barangay);
        }
        return $builder->paginate(10);
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
        // broadcast(new RecordSaved($outMigration))->toOthers();
        return $outMigration;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $builder = OutMigration::with('record.user.profilePicture')
            ->with('comments.user.profilePicture');
        if ($request->user()->hasRole(Role::PPO_ONE)) {
            $user = $request->user();
            $builder = $builder->where('municipality', $user->municipality)
                ->where('barangay', $user->barangay);
        }
        return $builder->findOrFail($id);
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
