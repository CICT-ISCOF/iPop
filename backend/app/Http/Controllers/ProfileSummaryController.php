<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\ProfileSummary;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class ProfileSummaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProfileSummary::first();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $file = $request->file('file');

        if ($file === null || is_array($file)) {
            return response('Invalid file.', 422);
        }

        $file = File::process($file);
        $file->public = true;
        $file->save();

        $profile = ProfileSummary::first();

        if ($profile) {
            $old = $profile->file;
            $profile->file_id = $file->id;
            $profile->save();
            $old->delete();
            return $profile;
        }
        return ProfileSummary::create(['file_id' => $file->id]);
    }
}
