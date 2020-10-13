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
        return Link::where('parent_id', null)->get();
        // ->with('cards')
        // ->with('grids')
        // ->with('lists.items')
        // ->with('medias')
        // ->with('sliders')
        // ->with('texts')
        // ->get('articles');
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
        return Link::where('parent_id', null)
            ->with('articles')
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
        $data = $request->validate([
            'parent_id' => ['nullable', 'exists:App\Models\CMS\Link,id'],
            'title' => ['nullable', 'string', 'max:255'],
        ]);
        $link->update($data);
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

    public function children(Request $request)
    {
        $data = $request->validate([
            'parent_id' => ['required', 'exists:App\Models\CMS\Link,id'],
            'title' => ['required', 'string', 'max:255'],
        ]);
        return Link::create($data);
    }
}
