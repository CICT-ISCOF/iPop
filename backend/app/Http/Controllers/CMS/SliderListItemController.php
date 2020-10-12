<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\SliderList;
use App\Models\CMS\SliderListItem;
use App\Models\File;
use Illuminate\Http\Request;

class SliderListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->validate([
            'slider_list_id' => ['required', 'exists:App\Models\CMS\SliderList,id'],
        ])['slider_list_id'];
        return SliderListItem::where('slider_list_id', $id)
            ->with('slider')
            ->get();
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
            'slider_list_id' => ['required', 'exists:App\Models\CMS\SliderList,id'],
            'file' => ['required', 'file'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();
        $data['file_id'] = $file->id;
        return SliderListItem::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SliderListItem::with('slider')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SliderListItem  $sliderListItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SliderListItem $sliderListItem)
    {
        $data = $request->validate([
            'slider_list_id' => ['nullable', 'exists:App\Models\CMS\SliderList,id'],
            'file' => ['nullable', 'file'],
        ]);

        if (isset($data['file'])) {
            $file = File::process($data['file']);
            $file->public = true;
            $file->save();
            $data['file_id'] = $file->id;
            $sliderListItem->file->delete();
        }
        $sliderListItem->update($data);
        return $sliderListItem;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SliderListItem  $sliderListItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(SliderListItem $sliderListItem)
    {
        $sliderListItem->delete();
        return response('', 204);
    }
}
