<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Role;
use App\Models\SBMPTCFocalPerson;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SBMPTCFocalPersonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SBMPTCFocalPerson::getApproved()->paginate(10)
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
            'sbmptc_id' => ['required', Rule::exists('s_b_m_p_t_c_s', 'id')],
        ]);

        $sBMPTCFocalPerson = SBMPTCFocalPerson::create($data);
        $sBMPTCFocalPerson->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $sBMPTCFocalPerson->setApproved($request->user()->hasRole(Role::ADMIN));

        return $sBMPTCFocalPerson;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SBMPTCFocalPerson  $sBMPTCFocalPerson
     * @return \Illuminate\Http\Response
     */
    public function show(SBMPTCFocalPerson $sBMPTCFocalPerson)
    {
        return SBMPTCFocalPerson::findApproved($sBMPTCFocalPerson->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMPTCFocalPerson  $sBMPTCFocalPerson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SBMPTCFocalPerson $sBMPTCFocalPerson)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
        ]);

        $sBMPTCFocalPerson->update($data);
        $sBMPTCFocalPerson->setApproved($request->user()->hasRole(Role::ADMIN));

        return $sBMPTCFocalPerson;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMPTCFocalPerson  $sBMPTCFocalPerson
     * @return \Illuminate\Http\Response
     */
    public function destroy(SBMPTCFocalPerson $sBMPTCFocalPerson)
    {
        $sBMPTCFocalPerson->delete();
        return response('', 204);
    }
}
