<?php

namespace App\Http\Controllers;

use App\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function streamPublic(File $file)
    {
        if (!$file->public) {
            return response('', 404);
        }
        return response(Storage::get($file->url), 200, [
            'Content-Type' => $file->type,
            'Content-Length' => $file->size,
        ]);
    }

    public function downloadPublic(File $file)
    {
        if (!$file->public) {
            return response('', 404);
        }
        return Storage::download($file->url);
    }

    public function streamPrivate(File $file)
    {
        return response(Storage::get($file->url), 200, [
            'Content-Type' => $file->type,
            'Content-Length' => $file->size,
        ]);
    }

    public function downloadPrivate(File $file)
    {
        return Storage::download($file->url);
    }
}
