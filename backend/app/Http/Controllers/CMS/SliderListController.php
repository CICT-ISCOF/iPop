<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\SliderList;
use Illuminate\Http\Request;

class SliderListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SliderList::with('link')
            ->with('items')
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
            'link_id' => ['required', 'exists:App\Models\CMS\Link,id'],
        ]);
        return SliderList::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SliderList::with('link')
            ->with('items')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SliderList  $sliderList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SliderList $sliderList)
    {
        $data = $request->validate([
            'link_id' => ['required', 'exists:App\Models\CMS\Link,id'],
        ]);
        $sliderList->update($data);
        return $sliderList;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SliderList  $sliderList
     * @return \Illuminate\Http\Response
     */
    public function destroy(SliderList $sliderList)
    {
        $sliderList->delete();
        return response('', 204);
    }
}
