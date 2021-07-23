<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Other;
use Illuminate\Http\Request;

class OtherController extends Controller
{
    public function index()
    {
        return Other::with('file')->get();
    }

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

    public function show(Other $other)
    {
        $other->load('file');
        return $other;
    }

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

    public function destroy(Other $other)
    {
        $other->delete();
        return response('', 204);
    }
}
