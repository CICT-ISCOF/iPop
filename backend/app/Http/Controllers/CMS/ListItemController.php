<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\ListItem;
use Illuminate\Http\Request;

class ListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->validate([
            'link_list_id' => ['required', 'exists:App\Models\CMS\LinkList,id'],
        ])['link_list_id'];
        return ListItem::where('link_list_id', $id)
            ->with('list')
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
            'body' => ['required', 'string'],
            'link_list_id' => ['required', 'exists:App\Models\CMS\LinkList,id'],
        ]);
        return ListItem::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return ListItem::with('list')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ListItem  $listItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ListItem $listItem)
    {
        $data = $request->validate([
            'body' => ['nullable', 'string'],
            'link_list_id' => ['nullable', 'exists:App\Models\CMS\LinkList,id'],
        ]);
        $listItem->update($data);
        return $listItem;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ListItem  $listItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(ListItem $listItem)
    {
        $listItem->delete();
        return response('', 204);
    }
}
