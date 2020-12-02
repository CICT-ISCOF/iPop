<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
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
        return Slider::getApproved()->all();
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
            'photo' => ['required', 'file'],
        ]);

        $photo = File::process($data['photo']);
        $photo->public = true;
        $photo->save();

        $slider = Slider::create(['photo_id' => $photo->id]);
        $slider->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $slider->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Created a Slider Photo.");

        return $slider;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function show(Slider $slider)
    {
        return $slider;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Slider $slider)
    {
        $data = $request->validate([
            'photo' => ['required', 'file'],
        ]);

        $photo = File::process($data['photo']);
        $photo->public = true;

        $old = $slider->photo;
        $slider->photo()->save($photo);
        $old->delete();
        $slider->setApproved($request->user()->hasRole(Role::ADMIN));

        Log::record("Updated a Slider Photo.");

        return $slider;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function destroy(Slider $slider)
    {
        $slider->makeDeleteRequest();

        Log::record("Deleted a Slider Photo.");

        return response('', 204);
    }
}
