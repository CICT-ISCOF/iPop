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
        return static::whereHas('approval', function ($builder) use ($mode) {
            return $builder->where('approved', $mode);
        })->with('approval');
    }

    /**
     * @return static|null
     */
    public static function findApproved($id, $mode = true)
    {
        return static::where('id', $id)
            ->whereHas('approval', function ($builder) use ($mode) {
                return $builder->where('approved', $mode);
            })
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
