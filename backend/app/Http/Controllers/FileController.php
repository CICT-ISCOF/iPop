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
        return $this->stream($file);
    }

    public function downloadPublic(File $file)
    {
        if (!$file->public) {
            return response('', 404);
        }
        return $this->download($file);
    }

    public function streamPrivate(File $file)
    {
        return $this->stream($file);
    }

    public function downloadPrivate(File $file)
    {
        return $this->download($file);
    }

    /**
     * Stream a file as binary into the response.
     *
     * @param \App\File $file
     * @return \Illuminate\Http\Response
     */
    private function stream(File $file)
    {
        return response(Storage::get($file->url), 200, [
            'Content-Type' => $file->type,
            'Content-Length' => $file->size,
        ]);
    }

    /**
     * Return a file as a download response.
     *
     * @param \App\File $file
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    private function download(File $file)
    {
        return Storage::download($file->url);
    }
}
