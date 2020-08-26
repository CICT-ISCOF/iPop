<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    protected $fillable = ['type', 'name', 'url', 'size', 'public', 'user_id'];

    protected $casts = [
        'public' => 'boolean',
    ];

    protected $hidden = ['name', 'url', 'user_id'];

    protected $appends = ['uri'];

    public function getUriAttribute()
    {
        $scope = $this->public ? 'public' : 'private';
        return url("/file/{$scope}/{$this->id}");
    }

    protected static function booted()
    {
        static::deleting(function ($file) {
            Storage::delete($file->url);
        });
    }

    /**
     * Process an uploaded file for saving to the database.
     *
     * @param Illuminate\Http\UploadedFile $file
     * @param User $user
     * @return File
     */
    public static function process(UploadedFile $file, User $user)
    {
        return new self([
            'type' => $file->getMimeType(),
            'name' => $file->getClientOriginalName(),
            'url' => $file->store('files'),
            'size' => $file->getSize(),
            'user_id' => $user->id,
        ]);
    }
}
