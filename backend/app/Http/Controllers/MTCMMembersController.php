<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\MTCMMember;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MTCMMembersController extends Controller
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
        return MTCMMember::getApproved()
            ->with('sbmptc')
            ->paginate(10);
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
            'municipality' => ['required', Rule::exists('municipalities', 'name')],
            'sbmptc_id' => ['required', Rule::exists('s_b_m_p_t_c_s', 'id')]
        ]);

        Log::record("Created a MTCM Member.");

        $member = MTCMMember::create($data);
        $member->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a MTCM Member.'),
        ]);
        $member->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record('User created a MTCM Member.');

        return $member;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        return MTCMMember::findApproved($id)
            ->with('sbmptc')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MTCMMember $mtcm
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MTCMMember $mtcm)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'municipality' => ['nullable', Rule::exists('municipalities', 'name')],
            'sbmptc_id' => ['nullable', Rule::exists('s_b_m_p_t_c_s', 'id')]
        ]);

        $mtcm->update($data);
        $mtcm->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a MTCM Member.'));

        Log::record("Updated a MTCM Member.");

        return $mtcm;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MTCMMember  $mtcm
     * @return \Illuminate\Http\Response
     */
    public function destroy(MTCMMember $mtcm)
    {
        $mtcm->makeDeleteRequest();

        Log::record("Deleted a MTCM Member.");

        return response('', 204);
    }
}
