<?php

namespace App\Http\Controllers;

use App\Models\CMS\Chart;
use App\Models\File;
use App\Models\Role;
use Illuminate\Http\Request;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Chart::getApproved()->get();
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

        $file = File::process($data['photo']);
        $file->public = true;
        $file->save();
        $chart = Chart::create(['photo_id' => $file->id]);
        $chart->approval()->create(['requester_id' => $request->user()->id]);
        $chart->setApproved($request->user()->hasRole(Role::ADMIN));
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
        $chart->delete();
        return response('', 204);
    }
}
