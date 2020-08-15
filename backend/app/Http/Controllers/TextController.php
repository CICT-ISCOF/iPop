<?php

namespace App\Http\Controllers;

use App\Text;
use App\Http\Requests\TextRequest;
use Illuminate\Http\Request;

class TextController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Text::orderBy('position', 'ASC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\TextRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TextRequest $request)
    {
        return Text::create($request->validated());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Text  $text
     * @return \Illuminate\Http\Response
     */
    public function show(Text $text)
    {
        return $text;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\TextRequest  $request
     * @param  \App\Text  $text
     * @return \Illuminate\Http\Response
     */
    public function update(TextRequest $request, Text $text)
    {
        $text->update($request->validated());
        return $text;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Text  $text
     * @return \Illuminate\Http\Response
     */
    public function destroy(Text $text)
    {
        $text->delete();
        return response('', 204);
    }
}
