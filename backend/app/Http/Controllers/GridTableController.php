<?php

namespace App\Http\Controllers;

use App\Grid;
use App\GridTable;
use App\Http\Requests\GridRequest;
use Illuminate\Http\Request;

class GridTableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\GridRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GridRequest $request)
    {
        $data = $request->validated();
        $table = GridTable::create($data);
        $uploads = $request->allFiles();
        $sliders = [];
        $count = 1;
        foreach ($uploads as $upload) {
            $file = File::process($upload, $request->user());
            $file->public = true;
            $file->save();
            $sliders[] = Grid::create([
                'grid_table_id' => $table->id,
                'file_id' => $file->id,
                'position' => $count,
            ]);
            $count++;
        }
        return $sliders;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\GridTable  $gridTable
     * @return \Illuminate\Http\Response
     */
    public function show(GridTable $gridTable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GridTable  $gridTable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GridTable $gridTable)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GridTable  $gridTable
     * @return \Illuminate\Http\Response
     */
    public function destroy(GridTable $gridTable)
    {
        $gridTable->delete();
        return response('', 204);
    }
}
