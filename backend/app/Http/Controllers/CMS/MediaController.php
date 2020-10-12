<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\Media;
use App\Models\File;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Media::with('link')->get();
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
            'link_id' => ['required', 'exists:App\CMS\Link,id'],
            'file' => ['required', 'isFile'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();
        $data['file_id'] = $file->id;
        return Media::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Media::with('link')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Media $media)
    {
        $data = $request->validate([
            'link_id' => ['nullable', 'exists:App\CMS\Link,id'],
            'file' => ['nullable', 'isFile'],
        ]);

        if (isset($data['file'])) {
            $file = File::process($data['file']);
            $file->public = true;
            $file->save();
            $data['file_id'] = $file->id;
            $media->file->delete();
        }
        $media->update($data);
        return $media;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Media  $media
     * @return \Illuminate\Http\Response
     */
    public function destroy(Media $media)
    {
        $media->delete();
        return response('', 204);
    }
}
