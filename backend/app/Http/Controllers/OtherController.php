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
        $data = $request->validate([
            'thumbnail' => ['required', 'file'],
            'files' => ['required', 'array'],
            'files.*' => ['required', 'file'],
        ]);

        $file = File::process($data['thumbnail']);
        $file->public = true;
        $file->save();

        /**
         * @var \App\Models\Other
         */
        $other = Other::create([
            'thumbnail_id' => $file->id,
            'user_id' => $request->user()->id,
        ]);

        foreach (collect($data['files']) as $raw) {
            $file = File::process($raw);
            $file->public = true;
            $file->save();

            $other->files()->create([
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

    public function update(Request $request, Other $other)
    {
        return response('', 400);
    }

    public function destroy(Other $other)
    {
        $other->delete();
        return response('', 204);
    }
}
