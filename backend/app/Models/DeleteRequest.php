<?php

namespace App\Models;

use App\Casts\JSON;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeleteRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'approved',
        'approver_id',
        'requester_id',
        'metadata',
        'deleteable_id',
    ];

    protected $with = ['deleteable'];
    protected $casts = [
        'metadata' => JSON::class,
        'approved' => 'boolean',
    ];
    protected $appends = ['pending'];

    public static function booted()
    {
        static::saved(function ($request) {
            if ($request->approved === true && !$request->isGone()) {
                $class = explode('\\', $request->deletable_type);
                $class = $class[count($class) - 1];
                $request->deleteable->delete();
                Log::record("Deleted a {$class}.");
                $request->delete();
            }
            if (($request->isPending() || $request->approved === false) && $request->isGone()) {
                $model = $request->deleteable_type;
                $entity = new $model();
                $data = (array)$request->metadata;
                $entity->fill($data);
                $entity->id = $data['id'];
                $entity->created_at = $data['created_at'];
                $entity->save();
                $class = explode('\\', $request->deletable_type);
                $class = $class[count($class) - 1];
                Log::record("Restored a deleted record called: {$class}.");
            }
        });
    }

    public function getPendingAttribute()
    {
        return $this->isPending();
    }

    public function isPending()
    {
        return $this->approved === null;
    }

    public function isGone()
    {
        return $this->deleteable === null;
    }

    public function deleteable()
    {
        return $this->morphTo();
    }
}
