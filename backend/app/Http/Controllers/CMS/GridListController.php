<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\GridList;
use Illuminate\Http\Request;

class GridListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GridList::with('link')
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
        return response('', 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return GridList::with('link')
            ->with('items')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GridList  $gridList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GridList $gridList)
    {
        return response('', 403);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GridList  $gridList
     * @return \Illuminate\Http\Response
     */
    public function destroy(GridList $gridList)
    {
        $gridList->delete();
        return response('', 204);
    }
}
