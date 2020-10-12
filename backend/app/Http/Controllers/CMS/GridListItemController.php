<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\GridList;
use App\Models\CMS\GridListItem;
use App\Models\File;
use Illuminate\Http\Request;

class GridListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(request $request)
    {
        $id = $request->validate([
            'grid_list_id' => ['required', 'exists:App\Models\CMS\GridList,id'],
        ])['grid_list_id'];
        return GridListItem::where('grid_list_id', $id)
            ->with('grid')
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
            'title' => ['required', 'string', 'max:255'],
            'grid_list_id' => ['required', 'exists:App\Models\CMS\GridList,id'],
            'file' => ['required', 'file'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();
        $data['file_id'] = $file->id;
        return GridListItem::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return GridListItem::with('grid')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\GridListItem  $gridListItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GridListItem $gridListItem)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'file' => ['nullable', 'file'],
        ]);

        if (isset($data['file'])) {
            $file = File::process($data['file']);
            $file->public = true;
            $file->save();
            $data['file_id'] = $file->id;
            $gridListItem->file->delete();
        }
        $gridListItem->update($data);
        return $gridListItem;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\GridListItem  $gridListItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(GridListItem $gridListItem)
    {
        $gridListItem->delete();
        return response('', 204);
    }
}
