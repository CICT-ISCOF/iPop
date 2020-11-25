<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\BarangayOfficial;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BarangayOfficialController extends Controller
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
        return BarangayOfficial::getApproved()
            ->sortBy('barangay')
            ->paginate(15);
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
            'barangay' => ['required', 'string', Rule::exists('barangays', 'name')]
        ]);

        $barangayOfficial = BarangayOfficial::create($data);
        $barangayOfficial->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $barangayOfficial->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User created a barangay official.");
        return $barangayOfficial;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BarangayOfficial  $barangayOfficial
     * @return \Illuminate\Http\Response
     */
    public function show(BarangayOfficial $barangayOfficial)
    {
        return BarangayOfficial::findApproved($barangayOfficial->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BarangayOfficial  $barangayOfficial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BarangayOfficial $barangayOfficial)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', Rule::exists('barangays', 'name')]
        ]);

        $barangayOfficial->update($data);
        $barangayOfficial->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User updated a barangay official.");
        return $barangayOfficial;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BarangayOfficial  $barangayOfficial
     * @return \Illuminate\Http\Response
     */
    public function destroy(BarangayOfficial $barangayOfficial)
    {
        $barangayOfficial->delete();
        Log::record("User deleted a barangay official.");
        return response('', 204);
    }
}
