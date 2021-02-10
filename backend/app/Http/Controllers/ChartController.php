<?php

namespace App\Http\Controllers;

use App\Models\CMS\Chart;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('store', 'update', 'destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Chart::getApproved()->first();
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
            'photo' => ['required', 'isFile'],
        ]);

        if (Chart::count() === 0) {
            $file = File::process($data['photo']);
            $file->public = true;
            $file->save();
            $chart = Chart::create(['photo_id' => $file->id]);
            $chart->approval()->create([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to add a chart organization photo.'),
            ]);
            $chart->setApproved($request->user()->hasRole(Role::ADMIN));
            Log::record("Created a chart organization photo.");
        } else {
            $oldChart = Chart::with('approval')->first();
            $oldChart->delete();
            $file = File::process($data['photo']);
            $file->public = true;
            $file->save();
            $chart = Chart::create(['photo_id' => $file->id]);
            $chart->approval()->create([
                'requester_id' => $request->user()->id,
                'message' => $request->user()->makeMessage('wants to update the chart organization photo.'),
            ]);
            $chart->setApproved($request->user()->hasRole(Role::ADMIN));
            Log::record("Update the chart organization photo.");
        }

        return $chart;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CMS\Chart  $chart
     * @return \Illuminate\Http\Response
     */
    public function show(Chart $chart)
    {
        return Chart::findApproved($chart->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CMS\Chart  $chart
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Chart $chart)
    {
        return response('', 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CMS\Chart  $chart
     * @return \Illuminate\Http\Response
     */
    public function destroy(Chart $chart)
    {
        $chart->makeDeleteRequest();
        Log::record("Deleted a chart.");
        return response('', 204);
    }
}
