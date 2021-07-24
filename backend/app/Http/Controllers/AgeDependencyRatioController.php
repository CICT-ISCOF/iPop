<?php

namespace App\Http\Controllers;

use App\Models\AgeDependencyRatio;
use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class AgeDependencyRatioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AgeDependencyRatio::getApproved()->get();
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
            'name' => ['required', 'string'],
            'number' => ['required', 'numeric'],
        ]);

        $ageDependencyRatio = AgeDependencyRatio::create($data);
        $ageDependencyRatio->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add an age dependency ratio.'),
        ]));

        Log::record("Created an age dependency ratio.");

        return $ageDependencyRatio;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AgeDependencyRatio  $ageDependencyRatio
     * @return \Illuminate\Http\Response
     */
    public function show(AgeDependencyRatio $ageDependencyRatio)
    {
        return $ageDependencyRatio;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AgeDependencyRatio  $ageDependencyRatio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AgeDependencyRatio $ageDependencyRatio)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'number' => ['nullable', 'numeric'],
        ]);

        $ageDependencyRatio->update($data);
        $ageDependencyRatio->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update an age dependency ratio.'));

        Log::record("Updated an age dependency ratio.");

        return $ageDependencyRatio;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AgeDependencyRatio  $ageDependencyRatio
     * @return \Illuminate\Http\Response
     */
    public function destroy(AgeDependencyRatio $ageDependencyRatio)
    {
        $ageDependencyRatio->delete();

        return response('', 204);
    }
}
