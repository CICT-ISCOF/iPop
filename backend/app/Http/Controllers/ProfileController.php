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

    public function byMunicipality(Request $request)
    {
        $data = $request->all();
        return Profile::getApproved()
        ->where('year',$data['year'])
        ->whereNotNull('municipality')
        ->whereNull('barangay')
        ->orderBy('municipality','asc')
        ->get();
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

    public function index(Request $request)
    {
        $queries = $request->all();
        $builder = Profile::getApproved();
        foreach ($queries as $key => $query) {
            if ($query === 'null' || $query === null) {
                $builder = $builder->whereNull($key);
            } else {
                $builder = $builder->where($key, $query);
            }
        }
        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $profile = [];
        $builder = new Profile();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                    $builder->whereNull( $key ); 
                }else{
                    $builder = $builder->where( $key, $value );
                }
            }
        }
        $profile =  $builder->where('year',$data['year'])->first();
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

    public function show(Profile $profile)
    {
        return Profile::findApproved($profile->id)->first()
            ?: response('', 404);
    }

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

    public function destroy($id)
    {
        $profile = Profile::findOrFail($id);
        $profile->makeDeleteRequest();
        Log::record("Deleted a Statistics Profile.");
        return response('', 204);
    }
}
