<?php

namespace App\Http\Controllers;

use App\Models\Death;
use App\Models\Log;
use App\Models\Record;
use App\Http\Requests\DeathRequest;
use App\Http\Requests\DeathUpdateRequest;
use Illuminate\Http\Request;

class DeathController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Death::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\DeathRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DeathRequest $request)
    {
        Log::record('Created a Death record.');
        $death = Death::create($request->validated());
        $record = new Record([
            'user_id' => $request->user()->id,
            'status' => 'Pending'
        ]);
        $death->record()->save($record);
        $death->record = $record;
        return $death;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Death::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\DeathUpdateRequest  $request
     * @param  \App\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function update(DeathUpdateRequest $request, Death $death)
    {
        Log::record('Updated a Death record.');
        $death->update($request->validated());
        $death->record->update([
            'status' => 'Requires Revalidation'
        ]);
        return $death;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Death  $death
     * @return \Illuminate\Http\Response
     */
    public function destroy(Death $death)
    {
        Log::record('Deleted a Death record.');
        $death->delete();
        return response('', 204);
    }
}
