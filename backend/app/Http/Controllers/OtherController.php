<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Other;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    public function index()
    {
        return Other::with([
            'thumbnail',
            'files.file',
            'user.profilePicture',
        ])->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $request->validate([
            'thumbnail' => ['required', 'file'],
            'name' => ['required', 'string'],
        ]);

        $file = File::process($data['thumbnail']);
        $file->public = true;
        $file->save();

        $other = Other::create([
            'thumbnail_id' => $file->id,
            'name' => $data['name'],
        ]);

        for($i = 0;$i < 99;$i++){
            if( $i > 99){
                break;
                return response([
                    'message' => 'Maximum of 99 files could be uploaded.'
                ]);
            }
            if(!isset( $data['files'.$i])){
                break;
            }
            $raw = $data['files'.$i];
            $file = File::process($raw);
            $file->public = true;
            $file->save();
            $other->files()->create([
                'user_id' => $request->user()->id,
                'other_id' => $other->id,
                'file_id' => $file->id,
            ]);
        }

        $other->load([
            'thumbnail',
            'files.file',
            'user.profilePicture',
        ]);

        return $other;
    }

    public function show(Other $other)
    {
        $other->load([
            'thumbnail',
            'files.file',
            'user.profilePicture',
        ]);

        return $other;
    }

    public function destroy(Other $other)
    {
        $other->delete();
        return response('', 204);
    }
}
