<?php

namespace App\Traits;

use App\Models\Approval;

trait HasApproval
{
    public static function getApproved($mode = true)
    {
        $ids = Approval::where('approvable_type', static::class)
            ->get()
            ->filter(function ($approval) use ($mode) {
                return $approval->approved === $mode;
            })->map(function ($approval) {
                return $approval->approvable_id;
            })->all();

        return static::whereIn('id', $ids);
    }

    public static function findApproved($id, $mode = true)
    {
        $approval = Approval::where('approvable_type', static::class)
            ->where('approvable_id', $id)
            ->where('approved', $mode)
            ->first();

        if (!$approval) {
            return null;
        }
        return static::where('id', $approval->approval->id);
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
        if ($mode) {
            $this->approval->approver_id = request()->user()->id;
        }
        $this->approval->save();
        $this->approval->load('approver');
        return $this;
    }
}
