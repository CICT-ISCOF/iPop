<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\MunicipalOfficial;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MunicipalOfficialController extends Controller
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
    public function index(Request $request)
    {
        $builder = MunicipalOfficial::getApproved();

        foreach ($request->all() as $key => $value) {
            $builder = $builder->where($key, $value);
        }

        return $builder->get();
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
            'municipality' => ['required', 'string', Rule::exists('municipalities', 'name')]
        ]);

        $municipalOfficial = MunicipalOfficial::create($data);
        $municipalOfficial->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a municipal official.')
        ]));
        $municipalOfficial->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a Municipal Official.");

        return $municipalOfficial;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MunicipalOfficial  $municipalOfficial
     * @return \Illuminate\Http\Response
     */
    public function show(MunicipalOfficial $municipalOfficial)
    {
        return MunicipalOfficial::findApproved($municipalOfficial->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MunicipalOfficial  $municipalOfficial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MunicipalOfficial $municipalOfficial)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'municipality' => ['nullable', 'string', Rule::exists('municipalities', 'name')]
        ]);

        $municipalOfficial->update($data);
        $municipalOfficial->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a municipal official.'));

        Log::record("Updated a Municipal Official.");

        return $municipalOfficial;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MunicipalOfficial  $municipalOfficial
     * @return \Illuminate\Http\Response
     */
    public function destroy(MunicipalOfficial $municipalOfficial)
    {
        $municipalOfficial->makeDeleteRequest();

        Log::record("Deleted a Municipal Official.");

        return response('', 204);
    }
}
