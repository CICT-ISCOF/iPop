<?php

namespace App\Http\Controllers;

use App\File;
use App\Slider;
use App\SliderTable;
use App\Http\Requests\SliderRequest;
use Illuminate\Http\Request;

class SliderTableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SliderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SliderRequest $request)
    {
        $data = $request->validated();
        $table = SliderTable::create($data);
        $uploads = $request->allFiles();
        $sliders = [];
        $count = 1;
        foreach ($uploads as $upload) {
            $file = File::process($upload, $request->user());
            $file->public = true;
            $file->save();
            $sliders[] = Slider::create([
                'slider_table_id' => $table->id,
                'file_id' => $file->id,
                'position' => $count,
            ]);
            $count++;
        }
        return $sliders;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\SliderTable  $sliderTable
     * @return \Illuminate\Http\Response
     */
    public function show(SliderTable $sliderTable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\SliderTable  $sliderTable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SliderTable $sliderTable)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\SliderTable  $sliderTable
     * @return \Illuminate\Http\Response
     */
    public function destroy(SliderTable $sliderTable)
    {
        $sliderTable->delete();
        return response('', 204);
    }
}
