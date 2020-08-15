<?php

namespace App\Http\Controllers;

use App\File;
use App\SingleMedia;
use App\Http\Requests\MediaRequest;
use Illuminate\Http\Request;

class SingleMediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SingleMedia::orderBy('position', 'ASC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\MediaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MediaRequest $request)
    {
        $data = $request->validated();
        $file = File::process($data['media'], $request->user());
        $file->public = true;
        $file->save();
        $media = SingleMedia::create([
            'link_id' => $data['link_id'],
            'file_id' => $file->id,
        ]);
        return $media;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SingleMedia  $singleMedia
     * @return \Illuminate\Http\Response
     */
    public function show(SingleMedia $singleMedia)
    {
        return $singleMedia;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SingleMedia  $singleMedia
     * @return \Illuminate\Http\Response
     */
    public function destroy(SingleMedia $singleMedia)
    {
        $singleMedia->delete();
        return response('', 204);
    }
}
