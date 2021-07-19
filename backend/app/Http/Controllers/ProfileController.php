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
        $this->middleware('auth:sanctum')->only('store', 'update', 'destroy');
    }

    public function byMunicipality()
    {
        $profiles = Profile::getApproved()->get();

        $data = [];

        foreach ($profiles as $profile) {
            if (!in_array($profile->municipality, array_keys($data))) {
                $data[$profile->municipality] = [
                    'municipality' => $profile->municipality,
                    'barangays' => 0,
                    'land_area' => 0,
                    'population_density' => 0,
                    'males' => 0,
                    'females' => 0,
                    'total' => 0,
                    'sex_ratio' => 0,
                    'number_of_hh' => 0,
                    'average_hh_size' => 0,
                ];
            }

            $data[$profile->municipality]['barangays'] += (int)$profile->barangays;
            $data[$profile->municipality]['land_area'] += (float)$profile->land_area;
            $data[$profile->municipality]['population_density'] += (int)$profile->population_density;
            $data[$profile->municipality]['males'] += (int)$profile->males;
            $data[$profile->municipality]['females'] += (int)$profile->females;
            $data[$profile->municipality]['total'] += (int)$profile->males + (int)$profile->females;
            $data[$profile->municipality]['sex_ratio'] += (int)$profile->sex_ratio;
            $data[$profile->municipality]['average_hh_size'] += (int)$profile->average_household_size;
        }
        return array_values($data);
    }

    public function total(Request $request)
    {
        $builder = Profile::getApproved();

        foreach ($request->all() as $key => $query) {
            $builder->where($key, $query);
        }

        $data = [
            'males' => 0,
            'females' => 0,
        ];

        foreach ($builder->get() as $profile) {
            $data['males'] += (int)$profile->males;
            $data['females'] += (int)$profile->females;
        }

        $data['total'] = $data['males'] + $data['females'];

        return $data;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $queries = $request->all();
        $builder = Profile::getApproved();
        foreach ($queries as $key => $query) {
            if ($query === 'null') {
                $builder = $builder->where($key, null);
            } else {
                $builder = $builder->where($key, $query);
            }
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
        $data = $request->all();

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
    public function update(Request $request, $id)
    {
        $profile = Profile::findOrFail($id);

        $data = $request->all();

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
    public function destroy($id)
    {
        $profile = Profile::findOrFail($id);
        $profile->makeDeleteRequest();

        Log::record("Deleted a Statistics Profile.");

        return response('', 204);
    }
}
