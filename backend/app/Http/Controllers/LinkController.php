<?php

namespace App\Http\Controllers;

use App\Link;
use App\Card;
use App\Grid;
use App\SingleMedia;
use App\Slider;
use App\Text;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController extends Controller
{
  
    public function index()
    {
        return Link::with('cards.file')
            ->with('grids.file')
            ->with('medias.file')
            ->with('sliders.file')
            ->with('texts')
            ->all();
    }

  
    public function store(Request $request)
    {
        $data = $request->all();
        foreach (['link', 'card', 'grid', 'media', 'slider', 'text'] as $key) {
            $data[$key] = isset($data[$key])
                ? (array) json_decode($data[$key])
                : null;
        }
        $link = new Link($data['link']);
        $link->slug = Str::slug($link->title);
        $link->save();
        $children = Link::searchChildren($data, $link);
        foreach ($children as $key => $value) {
            $link->{$key} = $value;
        }
        return $link;
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
        //
    }

    public function destroy(Link $link)
    {
        //
    }
}
