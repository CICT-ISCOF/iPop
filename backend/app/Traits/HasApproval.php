<?php

namespace App\Traits;

use App\Models\Approval;
use App\Models\DeleteRequest;
use App\Models\Log;
use App\Models\Role;
use App\Models\User;

trait HasApproval
{
    /**
     * @return static
     */
    public static function getApproved($mode = true)
    {
        $ids = Approval::where('approvable_type', static::class)
            ->where('approved', $mode)
            ->get()
            ->map(function ($approval) {
                return (int)$approval->approvable_id;
            })->all();

        // $ids = DeleteRequest::where('deleteable_type', static::class)
        //     ->where('approved', $mode)
        //     ->whereNotIn('deleteable_id', $ids)
        //     ->get()
        //     ->map(function ($request) {
        //         return $request->deleteable_id;
        //     })->all();

        return static::whereIn('id', $ids)
            ->with('approval');
    }

    /**
     * @return static|null
     */
    public static function findApproved($id, $mode = true)
    {
        $approval = Approval::where('approvable_type', static::class)
            ->where('approvable_id', $id)
            ->where('approved', $mode)
            ->first();

        if (!$approval) {
            return static::where('id', 0)
                ->with('approval');
        }

        // $request = DeleteRequest::where('deleteable_type', static::class)
        //     ->where('deletable_id', $id)
        //     ->where('approved', $mode)
        //     ->first();

        // if ($request) {
        //     return null;
        // }

        return static::where('id', $approval->approvable->id)
            ->with('approval');
    }

    public function approval()
    {
        return $this->morphOne(Approval::class, 'approvable');
    }

    /**
     * @param boolean $mode
     */
    public function setApproved($mode)
    {
        $this->load('approval');
        if ($this->approval !== null) {
            $this->approval->update([
                'approved' => $mode,
                'approver_id' => $mode
                    ? request()->user()->id
                    : null
            ]);
            $this->approval->load('approver');
        }
        return $this;
    }

    public function setApprovalMessage($message)
    {
        if ($this->approval !== null) {
            $this->approval->update(['message' => $message]);
        }
        return $this;
    }

    public function deleteable()
    {
        return $this->morphOne(DeleteRequest::class, 'deleteable');
    }

    public function makeDeleteRequest()
    {
        $user = User::find(request()->user()->id);
        $request = $this->deleteable;
        if ($request === null) {
            $request = $this->deleteable()->create([
                'requester_id' => $user->id,
                'approver_id' => $user->hasRole(Role::ADMIN) ? $user->id : null,
                'approved' => $user->hasRole(Role::ADMIN),
                'pending' => !$user->hasRole(Role::ADMIN),
                'metadata' => $this->toArray(),
            ]);
        } else {
            $request->update([
                'requester_id' => $user->id,
                'approver_id' => $user->hasRole(Role::ADMIN) ? $user->id : null,
                'approved' => $user->hasRole(Role::ADMIN),
                'metadata' => $this->toArray(),
                'pending' => !$user->hasRole(Role::ADMIN),
            ]);
        }
        if ($request->approved === true) {
            Log::record("Approved deletion of a record.");
        }
        if ($request->approved === null) {
            Log::record("Made a delete request for a record.");
        }
        return $request;
    }
}
