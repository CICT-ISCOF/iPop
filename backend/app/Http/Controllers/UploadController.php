<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Upload;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = Upload::with([
            'file',
            'user'
        ])->where('approved', true);

        if ($request->has('type')) {
            $builder = $builder->where('type', $request->get('type'));
        }

        return $builder->get();
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
            'type' => ['required', 'string'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();

        $user = $request->user();

        return Upload::create([
            'user_id' => $user->id,
            'file_id' => $file->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Upload  $upload
     * @return \Illuminate\Http\Response
     */
    public function show(Upload $upload)
    {
        $upload->load(['user', 'file']);

        return $upload;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Upload  $upload
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Upload $upload)
    {
        return response('', 400);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Upload  $upload
     * @return \Illuminate\Http\Response
     */
    public function destroy(Upload $upload)
    {
        $upload->delete();

        return response('', 204);
    }
}
