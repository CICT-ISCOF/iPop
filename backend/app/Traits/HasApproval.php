<?php

namespace App\Traits;

use App\Models\Approval;
use App\Models\DeleteRequest;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

trait HasApproval
{
    /**
     * @return static
     */
    public static function getApproved($mode = true)
    {
        $ids = Approval::where('approvable_type', static::class)
            ->get()
            ->filter(function ($approval) use ($mode) {
                return $approval->approved === $mode;
            })->map(function ($approval) {
                return $approval->approvable_id;
            })->all();

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
            return null;
        }
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
        $this->approval->approved = $mode;
        $this->approval->approver_id = $mode
            ? request()->user()->id
            : null;
        $this->approval->save();
        $this->approval->load('approver');
        return $this;
    }

    public function deleteRequest()
    {
        return $this->morphOne(DeleteRequest::class, 'deleteable');
    }

    public function makeDeleteRequest(): DeleteRequest
    {
        $user = request()->user();
        $request = $this->deleteRequest;
        if ($request === null) {
            $request = $this->deleteRequest()->create([
                'requester_id' => $user->id,
                'approver_id' => $user->hasRole(Role::ADMIN) ? $user->id : null,
                'appproved' => $user->hasRole(Role::ADMIN) ? true : null,
                'metadata' => json_encode($this->toArray()),
            ]);
        } else {
            $request->update([
                'requester_id' => $user->id,
                'approver_id' => $user->hasRole(Role::ADMIN) ? $user->id : null,
                'appproved' => $user->hasRole(Role::ADMIN) ? true : null,
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
