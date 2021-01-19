<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Role;
use App\Models\Statistics\Profile;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
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
        $queries = $request->validate([
            'municipality' => [
                Rule::requiredIf(function () use ($request) {
                    return $request->has('barangay');
                }),
                Rule::exists('municipalities', 'name')
            ],
            'barangay' => [
                Rule::requiredIf(function () use ($request) {
                    return $request->has('year');
                }),
                Rule::exists('barangays', 'name')
            ],
            'year' => ['nullable', 'date_format:Y'],
        ]);
        $builder = Profile::getApproved();
        foreach ($queries as $key => $query) {
            $builder->where($key, $query);
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
            'municipality' => ['required', Rule::exists('municipalities', 'name')],
            'barangay' => ['required', Rule::exists('barangays', 'name')],
            'year' => ['required', 'date_format:Y'],
            'coverage' => ['required', 'string', 'max:255'],
            'barangays' => ['required', 'string', 'max:255'],
            'land_area' => ['required', 'string', 'max:255'],
            'household_population' => ['required', 'string', 'max:255'],
            'males' => ['required', 'string', 'max:255'],
            'females' => ['required', 'string', 'max:255'],
            'sex_ratio' => ['required', 'string', 'max:255'],
            'median_age' => ['required', 'string', 'max:255'],
            'doubling' => ['required', 'string', 'max:255'],
            'growth_rate' => ['required', 'string', 'max:255'],
            'households' => ['required', 'string', 'max:255'],
            'average_household_size' => ['required', 'string', 'max:255'],
            'density' => ['required', 'string', 'max:255'],
            'age_dependency_ratio' => ['required', 'string', 'max:255'],
            'child_dependency_ratio' => ['required', 'string', 'max:255'],
            'old_age_dependency_ratio' => ['required', 'string', 'max:255'],
        ]);

        $profile = Profile::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();
        if (!$profile) {
            $profile = Profile::create($data);
            $profile->approval()->create([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a statistic profile.')
            ]);
        } else {
            $profile->update($data);
        }
        $profile->setApproved($request->user()->hasRole(Role::ADMIN));


        Log::record("Created a Statistics Profile.");

        return $profile;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function show(Profile $profile)
    {
        return Profile::findApproved($profile->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Profile $profile)
    {
        $data = $request->validate([
            'municipality' => ['nullable', Rule::exists('municipalities', 'name')],
            'barangay' => ['nullable', Rule::exists('barangays', 'name')],
            'year' => ['nullable', 'date_format:Y'],
            'coverage' => ['nullable', 'string', 'max:255'],
            'barangays' => ['nullable', 'string', 'max:255'],
            'land_area' => ['nullable', 'string', 'max:255'],
            'household_population' => ['nullable', 'string', 'max:255'],
            'males' => ['nullable', 'string', 'max:255'],
            'females' => ['nullable', 'string', 'max:255'],
            'sex_ratio' => ['nullable', 'string', 'max:255'],
            'median_age' => ['nullable', 'string', 'max:255'],
            'doubling' => ['nullable', 'string', 'max:255'],
            'growth_rate' => ['nullable', 'string', 'max:255'],
            'households' => ['nullable', 'string', 'max:255'],
            'average_household_size' => ['nullable', 'string', 'max:255'],
            'density' => ['nullable', 'string', 'max:255'],
            'age_dependency_ratio' => ['nullable', 'string', 'max:255'],
            'child_dependency_ratio' => ['nullable', 'string', 'max:255'],
            'old_age_dependency_ratio' => ['nullable', 'string', 'max:255'],
        ]);

        $profile->update($data);
        $profile->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a statistic profile.'));

        Log::record("Updated a Statistics Profile.");

        return $profile;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        $profile->makeDeleteRequest();

        Log::record("Deleted a Statistics Profile.");

        return response('', 204);
    }
}
