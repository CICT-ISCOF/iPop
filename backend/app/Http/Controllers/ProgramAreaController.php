<?php

namespace App\Http\Controllers;

use App\Models\CMS\ProgramArea;
use Illuminate\Http\Request;

class ProgramAreaController extends Controller
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
        return ProgramArea::getApproved()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return response('', 404);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CMS\ProgramArea  $programArea
     * @return \Illuminate\Http\Response
     */
    public function show(ProgramArea $programArea)
    {
        return ProgramArea::findApproved($programArea->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CMS\ProgramArea  $programArea
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProgramArea $programArea)
    {
         $programArea->update($request->all());
         return $programArea;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CMS\ProgramArea  $programArea
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProgramArea $programArea)
    {
        return response('', 404);
    }
}
