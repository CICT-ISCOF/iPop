<?php

namespace App\Http\Controllers;

use App\Models\CMS\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
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
        return Service::getApproved()->get();
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
     * @param  \App\Models\CMS\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function show(Service $service)
    {
        return Service::findApproved($service->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CMS\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Service $service)
    {
        return response('', 404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CMS\Service  $service
     * @return \Illuminate\Http\Response
     */
    public function destroy(Service $service)
    {
        return response('', 404);
    }
}
