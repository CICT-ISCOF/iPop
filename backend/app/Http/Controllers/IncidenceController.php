<?php

namespace App\Http\Controllers;

use App\Models\Incidence;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class IncidenceController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $builder = Incidence::getApproved();
        foreach ($request->all() as $parameter => $value) {
            if ($value === 'null') {
                $builder = $builder->whereNull($parameter);
            } else {
                $builder = $builder->where($parameter, $value);
            }
        }
        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $results = [];

        foreach ($data['years'] as $year) {
            $temp = $data;
            $temp['year'] = $year;
            $incidence = Incidence::where('year', $temp['year'])
                ->where('municipality', $temp['municipality'])
                ->where('barangay', $temp['barangay'])
                ->where('title', $temp['title'])
                ->with('approval')
                ->first();

            if ($incidence) {
                $incidence->update($temp);
            } else {
                $incidence = Incidence::create($temp);
                $incidence->approval()->create([
                    'requester_id' => $request->user()->id,
                    'message' => $request->user()->makeMessage('wants to add an incidence entry.'),
                ]);
            }
            $incidence->setApproved($request->user()->hasRole(Role::ADMIN));

            Log::record("Created an incidence entry.");
            $results[] = $incidence;
        }

        return $results;
    }

    public function show(Incidence $incidence)
    {
        return Incidence::findApproved($incidence->id)->first() ?: response('', 404);
    }

    public function update(Request $request, Incidence $incidence)
    {
        $incidence->update($request->all());
        $incidence->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update an incidence entry.'));

        Log::record("Updated an incidence entry.");

        return $incidence;
    }

    public function destroy(Incidence $incidence)
    {
        $incidence->makeDeleteRequest();

        return response('', 204);
    }
}
