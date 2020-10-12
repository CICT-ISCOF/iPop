<?php

namespace App\Http\Controllers;

use App\Models\CMS\QuickLink;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QuickLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return QuickLink::all();
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
            'body' => ['required', 'string'],
        ]);

        $data['slug'] = Str::slug($data['title']);
        return QuickLink::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\QuickLink  $quickLink
     * @return \Illuminate\Http\Response
     */
    public function show(QuickLink $quickLink)
    {
        return $quickLink;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\QuickLink  $quickLink
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, QuickLink $quickLink)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'body' => ['nullable', 'string'],
        ]);

        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }
        $quickLink->update($data);
        return $quickLink;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\QuickLink  $quickLink
     * @return \Illuminate\Http\Response
     */
    public function destroy(QuickLink $quickLink)
    {
        $quickLink->delete();
        return response('', 204);
    }
}
