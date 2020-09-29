<?php

namespace App\Http\Controllers;

use App\Models\Marriage;
use App\Models\Log;
use App\Models\Record;
use App\Http\Requests\MarriageRequest;
use App\Http\Requests\MarriageUpdateRequest;
use Illuminate\Http\Request;

class MarriageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Marriage::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\MarriageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MarriageRequest $request)
    {
        Log::record('Created a Marriage record.');
        $marriage = Marriage::create($request->validated());
        $record = new Record([
            'user_id' => $request->user()->id,
            'status' => 'Pending'
        ]);
        $marriage->record()->save($record);
        $marriage->record = $record;
        return $marriage;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Marriage::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\MarriageUpdateRequest  $request
     * @param  \App\Marriage  $marriage
     * @return \Illuminate\Http\Response
     */
    public function update(MarriageUpdateRequest $request, Marriage $marriage)
    {
        Log::record('Updated a Marriage record.');
        $marriage->update($request->validated());
        $marriage->record->update([
            'status' => 'Requires Revalidation'
        ]);
        return $marriage;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Marriage  $marriage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Marriage $marriage)
    {
        Log::record('Deleted a Marriage record.');
        $marriage->delete();
        return response('', 204);
    }
}
