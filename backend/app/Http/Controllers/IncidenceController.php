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
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = Incidence::getApproved();
        $builder = tap($builder, function ($builder) use ($request) {
            foreach ($request->all() as $parameter => $value) {
                $builder = $builder->where($parameter, $value);
            }
            return $builder;
        });
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Incidence  $incidence
     * @return \Illuminate\Http\Response
     */
    public function show(Incidence $incidence)
    {
        return Incidence::findApproved($incidence->id)->first() ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Incidence  $incidence
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Incidence $incidence)
    {
        $incidence->update($request->all());
        $incidence->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update an incidence entry.'));

        Log::record("Updated an incidence entry.");

        return $incidence;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Incidence  $incidence
     * @return \Illuminate\Http\Response
     */
    public function destroy(Incidence $incidence)
    {
        $incidence->makeDeleteRequest();

        return response('', 204);
    }
}
