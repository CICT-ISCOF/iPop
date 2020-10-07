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
            ->all();
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
        return response('', 403);
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
