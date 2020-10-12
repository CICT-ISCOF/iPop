<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\LinkList;
use Illuminate\Http\Request;

class LinkListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return LinkList::with('link')
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
            'title' => ['required', 'string', 'max:255'],
            'link_id' => ['required', 'exists:App\Models\CMS\Link,id'],
        ]);
        return LinkList::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return LinkList::with('link')
            ->with('items')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LinkList  $linkList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LinkList $linkList)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'link_id' => ['nullable', 'exists:App\Models\CMS\Link,id'],
        ]);
        $linkList->update($data);
        return $linkList;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LinkList  $linkList
     * @return \Illuminate\Http\Response
     */
    public function destroy(LinkList $linkList)
    {
        $linkList->delete();
        return response('', 204);
    }
}
