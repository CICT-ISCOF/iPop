<?php

namespace App\Http\Controllers;

use App\Birth;
use App\Record;
use App\Log;
use App\Http\Requests\BirthRequest;
use App\Http\Requests\BirthUpdateRequest;
use Illuminate\Http\Request;

class BirthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Birth::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\BirthRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BirthRequest $request)
    {
        Log::record('Created new Birth record.');
        $birth = Birth::create($request->validated());
        $record = new Record([
            'user_id' => $request->user()->id,
            'status' => 'Pending'
        ]);
        $birth->record()->save($record);
        $birth->record = $record;
        return $birth;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Birth::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->findOrFail($id);
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
        Log::record('Updated a birth record.');
        $birth->update($request->validated());
        $birth->record->update(['status' => 'Requires Revalidation']);
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
        Log::record('Deleted a birth record.');
        $birth->delete();
        return response('', 204);
    }
}
