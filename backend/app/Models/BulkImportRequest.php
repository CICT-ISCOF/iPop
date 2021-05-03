<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class BulkImportRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'user_id',
        'approved',
    ];

    protected $casts = [
        'approved' => 'boolean',
    ];

    public function approve($mode = true)
    {
        $this->update([
            'approved' => $mode,
        ]);

        $contents = (array)json_decode(Storage::get($this->path));

        $model = $contents['model'];

        foreach ($contents['data'] as $row) {
            $model::create($row);
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
