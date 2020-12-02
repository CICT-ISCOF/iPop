<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\ProvincialOfficial;
use App\Models\Role;
use Illuminate\Http\Request;

class ProvincialOfficialController extends Controller
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
        return ProvincialOfficial::getApproved()->paginate(10);
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

        $provincialOfficial = ProvincialOfficial::create($data);
        $provincialOfficial->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $provincialOfficial->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a Provincial Official.");

        return $provincialOfficial;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProvincialOfficial  $provincialOfficial
     * @return \Illuminate\Http\Response
     */
    public function show(ProvincialOfficial $provincialOfficial)
    {
        return ProvincialOfficial::findApproved($provincialOfficial->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProvincialOfficial  $provincialOfficial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProvincialOfficial $provincialOfficial)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'priority' => ['nullable', 'numeric'],
        ]);

        $provincialOfficial->update($data);
        $provincialOfficial->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Updated a Provincial Official.");

        return $provincialOfficial;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProvincialOfficial  $provincialOfficial
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProvincialOfficial $provincialOfficial)
    {
        $provincialOfficial->makeDeleteRequest();

        Log::record("Deleted a Provincial Official.");

        return response('', 204);
    }
}
