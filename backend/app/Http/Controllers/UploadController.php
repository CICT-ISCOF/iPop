<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Upload;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }
    
    
    public function index(Request $request)
    {
        $builder = Upload::with([
            'file',
            'user'
        ]);

        if ($request->has('type')) {
            $builder = $builder->where('type', $request->get('type'));
        }

        return $builder->get();
    }
    
    public function approvals(Request $request)
    {
        /**
            4.Super Admin (Province)
            4.TRD (Province)
            3.FOD (District)
            2.PPOII (Municipality)
        	1.PPOI (Barangay)
        */
        /**
         * Get Role of Current User
         * GET all Uploads with a particular type
         * Filter Uploads e return ya mga uploads ka role nga 1 heirarchy mas nubo sa iya
         */
        return $request->user();
        
    }

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
            'type' => $data['type']
        ]);
    }

    public function show(Upload $upload)
    {
        $upload->load(['user', 'file']);
        return $upload;
    }

    public function update(Request $request, Upload $upload)
    {
        $data = $request->validate([
            'approved' => ['nullable', 'boolean'],
        ]);

        $upload->update($data);
        $upload->load(['user', 'file']);
        return $upload;
    }

    
    public function destroy(Upload $upload)
    {
        $upload->delete();
        return response('', 204);
    }
}
