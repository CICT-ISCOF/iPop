<?php

namespace App\Http\Controllers\CMS;

use App\Http\Requests\CMS\LinkRequest;
use App\Models\CMS\Link;
use Illuminate\Http\Request;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Link::with('articles')
            ->with('cards')
            ->with('grids')
            ->with('linkLists.items')
            ->with('medias')
            ->with('sliders')
            ->with('texts')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CMS\LinkRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(LinkRequest $request)
    {
        return Link::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Link::with('articles')
            ->with('cards')
            ->with('grids')
            ->with('lists')
            ->with('medias')
            ->with('sliders')
            ->with('texts')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Link $link)
    {
        $link->update($request->only(['title', 'sub_categories']));
        return $link;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy(Link $link)
    {
        $link->delete();
        return response('', 204);
    }
}
