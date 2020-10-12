<?php

namespace App\Http\Controllers\CMS;

use App\Models\CMS\CardListItem;
use App\Models\File;
use Illuminate\Http\Request;

class CardListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->validate([
            'card_list_id' => ['required', 'exists:App\Models\CMS\CardList,id'],
        ])['card_list_id'];
        return CardListItem::where('card_list_id', $id)
            ->with('card')
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
            'card_list_id' => ['required', 'exists:App\Models\CMS\CardList,id'],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'file' => ['required', 'file']
        ]);
        $file = File::process($data['file']);
        $file->public = true;
        $file->save();
        $data['file_id'] = $file->id;
        return CardListItem::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CardListItem::with('card')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CardListItem  $cardListItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CardListItem $cardListItem)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'file' => ['nullable', 'file']
        ]);
        if (isset($data['file'])) {
            $file = File::process($data['file']);
            $file->public = true;
            $file->save();
            $data['file_id'] = $file->id;
            $cardListItem->file->delete();
        }
        $cardListItem->update($data);
        return $cardListItem;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CardListItem  $cardListItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(CardListItem $cardListItem)
    {
        $cardListItem->delete();
        return response('', 204);
    }
}
