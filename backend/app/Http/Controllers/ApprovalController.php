<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Role;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:' . Role::ADMIN])->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Approval::paginate(10);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function show(Approval $approval)
    {
        return $approval;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Approval $approval)
    {
        $data = $request->validate([
            'approved' => ['required', 'boolean'],
        ]);
        $approval->update($data);

        if ($data['approved']) {
            $approval->approver_id = $request->user()->id;
            $approval->save();
            $approval->load('approver');
        }

        return $approval;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Approval  $approval
     * @return \Illuminate\Http\Response
     */
    public function destroy(Approval $approval)
    {
        $approval->delete();
        return response('', 404);
    }
}
