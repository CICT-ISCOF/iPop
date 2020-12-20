<?php

namespace App\Http\Controllers;

use App\Models\AgeDistribution;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class AgeDistributionController extends Controller
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
        $builder = AgeDistribution::getApproved();

        foreach ($request->all() as $key => $value) {
            $builder->where($key, $value);
        }

        return $builder->first();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $ageDistribution = AgeDistribution::where('year', $data['year'])
            ->where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->first();

        if ($ageDistribution) {
            $ageDistribution->update($data);
            $ageDistribution->approval->update([
                'message' => $request->user()->makeMessage('wants to update an age distribution.'),
            ]);
        } else {
            $ageDistribution = AgeDistribution::create($data);
            $ageDistribution->approval()->create([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add an age distribution.'),
            ]);
        }

        $ageDistribution->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User create an age distribution.");

        return $ageDistribution;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AgeDistribution  $ageDistribution
     * @return \Illuminate\Http\Response
     */
    public function show(AgeDistribution $ageDistribution)
    {
        return AgeDistribution::findApproved($ageDistribution->id)
            ->first() ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AgeDistribution  $ageDistribution
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AgeDistribution $ageDistribution)
    {
        return response('', 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AgeDistribution  $ageDistribution
     * @return \Illuminate\Http\Response
     */
    public function destroy(AgeDistribution $ageDistribution)
    {
        $ageDistribution->makeDeleteRequest();

        return response('', 204);
    }
}
