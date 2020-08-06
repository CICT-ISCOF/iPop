<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class File extends Model
{
    protected $fillable = ['type', 'name', 'url', 'size'];

    public static function process(UploadedFile $file)
    {
        return self::create([
            'type' => $file->getMimeType(),
            'name' => $file->getClientOriginalName(),
            'url' => $file->store('files'),
            'size' => $file->getSize(),
        ]);
    }
}
