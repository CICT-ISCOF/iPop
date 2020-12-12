<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\SBMember;
use App\Models\Role;
use Illuminate\Http\Request;

class SBMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SBMember::getApproved()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'numeric'],
        ]);

        $SBMember = new SBMember($data);
        $SBMember->save();
        $SBMember->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a SB Member.')
        ]));
        $SBMember->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a SB Member.");

        return $SBMember;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SBMember  $SBMember
     * @return \Illuminate\Http\Response
     */
    public function show(SBMember $SBMember)
    {
        return SBMember::findApproved($SBMember->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMember  $SBMember
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $SBMember = SBMember::findOrFail($id);
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'numeric'],
        ]);

        $SBMember->fill($data);

        $SBMember->save();
        $SBMember->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a SB Member.'));

        Log::record("Updated a SB Member.");

        return $SBMember;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMember  $SBMember
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $SBMember = SBMember::findOrFail($id);
        $SBMember->makeDeleteRequest();

        Log::record("Deleted a SB Member.");

        return response('', 204);
    }
}
