<?php

namespace App\Http\Controllers;

use App\Models\AgeDistributionRatio;
use App\Models\Approval;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class AgeDistributionRatioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AgeDistributionRatio::getApproved()->get();
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
            'percent' => ['required', 'numeric'],
        ]);

        $ageDistributionRatio = AgeDistributionRatio::create($data);
        $ageDistributionRatio->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add an age distribution ratio.'),
        ]));

        Log::record("Created an age distribution ratio.");

        return $ageDistributionRatio;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AgeDistributionRatio  $ageDistributionRatio
     * @return \Illuminate\Http\Response
     */
    public function show(AgeDistributionRatio $ageDistributionRatio)
    {
        return $ageDistributionRatio;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AgeDistributionRatio  $ageDistributionRatio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AgeDistributionRatio $ageDistributionRatio)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'number' => ['nullable', 'numeric'],
            'percent' => ['nullable', 'numeric'],
        ]);

        $ageDistributionRatio->update($data);
        $ageDistributionRatio->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update an age distribution ratio.'));

        Log::record("Updated an age distribution ratio.");

        return $ageDistributionRatio;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AgeDistributionRatio  $ageDistributionRatio
     * @return \Illuminate\Http\Response
     */
    public function destroy(AgeDistributionRatio $ageDistributionRatio)
    {
        $ageDistributionRatio->delete();

        return response('', 204);
    }
}
