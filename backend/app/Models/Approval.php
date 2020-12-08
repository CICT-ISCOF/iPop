<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approval extends Model
{
    use HasFactory;

    protected $fillable = ['approved', 'requester_id', 'approver_id', 'message'];

    protected $casts = [
        'approved' => 'boolean'
    ];

    protected $with = ['requester.profilePicture', 'approver.profilePicture'];

    public static function booted()
    {
        static::deleted(function ($approval) {
            $approval->approvable->delete();
        });
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approver_id');
    }

    public function approvable()
    {
        return $this->morphTo();
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
