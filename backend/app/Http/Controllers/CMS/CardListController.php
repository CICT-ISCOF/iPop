<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\CardList;
use Illuminate\Http\Request;

class CardListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CardList::with('link')
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
        return CardList::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CardList::with('link')
            ->with('items')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CardList  $cardList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CardList $cardList)
    {
        $data = $request->validate([
            'link_id' => ['required', 'exists:App\Models\CMS\Link,id'],
        ]);
        $cardList->update($data);
        return $cardList;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CardList  $cardList
     * @return \Illuminate\Http\Response
     */
    public function destroy(CardList $cardList)
    {
        $cardList->delete();
        return response('', 204);
    }
}
