<?php

namespace App\Http\Controllers;

use App\Link;
use App\Http\Requests\LinkRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController extends Controller
{
    public function index()
    {
        return Link::with('cards')
            ->with('gridTables.grids')
            ->with('medias')
            ->with('sliderTables.sliders')
            ->with('texts')
            ->all();
    }

    public function store(LinkRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        return Link::create($data);
    }

    public function show($id)
    {
        return Link::with('cards.file')
            ->with('grids.file')
            ->with('medias.file')
            ->with('sliders.file')
            ->with('texts')
            ->findOrFail($id);
    }

    public function update(Request $request, Link $link)
    {
        $link->update($request->all());
        return $link;
    }

    public function destroy(Link $link)
    {
        $link->delete();
        return response('', 201);
    }
}
