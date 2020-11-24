<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Role;
use App\Models\Statistics\TeenageBirthIncidenceGraph;
use Illuminate\Http\Request;

class TeenageBirthIncidenceGraphController extends Controller
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
        return TeenageBirthIncidenceGraph::getApproved()->paginate(10);
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
            'municipality' => ['required', 'string', 'max:255'],
            'barangay' => ['required', 'string', 'max:255'],
            'year' => ['required', 'date_format:Y'],
            'month' => ['required', 'date_format:m'],
            'value' => ['required', 'numeric'],
        ]);

        $teenageBirthIncidenceGraph = TeenageBirthIncidenceGraph::create($data);
        $teenageBirthIncidenceGraph->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $teenageBirthIncidenceGraph->setApproved($request->user()->hasRole(Role::ADMIN));

        return $teenageBirthIncidenceGraph;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Statistics\TeenageBirthIncidenceGraph  $teenageBirthIncidenceGraph
     * @return \Illuminate\Http\Response
     */
    public function show(TeenageBirthIncidenceGraph $teenageBirthIncidenceGraph)
    {
        return TeenageBirthIncidenceGraph::findApproved($teenageBirthIncidenceGraph->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Statistics\TeenageBirthIncidenceGraph  $teenageBirthIncidenceGraph
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TeenageBirthIncidenceGraph $teenageBirthIncidenceGraph)
    {
        $data = $request->validate([
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'year' => ['nullable', 'date_format:Y'],
            'month' => ['nullable', 'date_format:m'],
            'value' => ['nullable', 'numeric'],
        ]);

        $teenageBirthIncidenceGraph->update($data);
        $teenageBirthIncidenceGraph->setApproved($request->user()->hasRole(Role::ADMIN));

        return $teenageBirthIncidenceGraph;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Statistics\TeenageBirthIncidenceGraph  $teenageBirthIncidenceGraph
     * @return \Illuminate\Http\Response
     */
    public function destroy(TeenageBirthIncidenceGraph $teenageBirthIncidenceGraph)
    {
        $teenageBirthIncidenceGraph->delete();

        return response('', 204);
    }
}
