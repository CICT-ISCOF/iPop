<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Other;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Other::with('file')->get();
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
            'file' => ['required', 'file'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();

        return Other::create(['file_id' => $file->id]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Other  $other
     * @return \Illuminate\Http\Response
     */
    public function show(Other $other)
    {
        $other->load('file');

        return $other;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Other  $other
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Other $other)
    {
        $data = $request->validate([
            'file' => ['required', 'file'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();

        $old = $other->file;

        $other->update(['file_id' => $file->id]);

        $old->delete();

        return $other;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Other  $other
     * @return \Illuminate\Http\Response
     */
    public function destroy(Other $other)
    {
        $other->delete();

        return response('', 204);
    }
}
