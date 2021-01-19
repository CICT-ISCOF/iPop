<?php

namespace App\Http\Controllers;

use App\Models\Birth;
use App\Models\Record;
use App\Models\Log;
use App\Events\RecordSaved;
use App\Http\Requests\BirthRequest;
use App\Http\Requests\BirthUpdateRequest;
use App\Models\Role;
use Illuminate\Http\Request;

class BirthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = Birth::with('record.user.profilePicture')
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
     * @param  \App\Http\Requests\BirthRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BirthRequest $request)
    {
        $user = $this->user($request);

        // $permissions = Birth::getRequiredPermissions();

        // if (!$user->verifyPermissions($permissions)) {
        //     return response([
        //         'errors' => [
        //             'account' => 'You do not have sufficient permissions.'
        //         ]
        //     ], 401);
        // }

        $birth = Birth::create($request->validated());
        $record = new Record([
            'user_id' => $user->id,
            'status' => 'Pending',
        ]);
        $birth->record()->save($record);
        $birth->record = $record;
        // broadcast(new RecordSaved($birth))->toOthers();
        Log::record('Created new Birth record.');
        return $birth;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $builder = Birth::with('record.user.profilePicture')
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
     * @param  \App\Http\Requests\BirthUpdateRequest  $request
     * @param  \App\Birth  $birth
     * @return \Illuminate\Http\Response
     */
    public function update(BirthUpdateRequest $request, Birth $birth)
    {
        $user = $this->user($request);

        // $permissions = Birth::getRequiredPermissions();

        // if (!$user->verifyPermissions($permissions)) {
        //     return response([
        //         'errors' => [
        //             'account' => 'You do not have sufficient permissions.'
        //         ]
        //     ], 401);
        // }

        $birth->update($request->validated());
        $birth->record->update(['status' => 'Requires Revalidation']);
        Log::record('Updated a birth record.');
        return $birth;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Birth  $birth
     * @return \Illuminate\Http\Response
     */
    public function destroy(Birth $birth)
    {
        $birth->delete();
        Log::record('Deleted a birth record.');
        return response('', 204);
    }

    /**
     * @return \App\Models\User
     */
    protected function user($request)
    {
        return $request->user();
    }
}
