<?php

namespace App\Http\Controllers;

use App\Models\SBMPTC;
use Illuminate\Http\Request;

class SBMPTCController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SBMPTC::with('members')
            ->with('photos')
            ->paginate(10);
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
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'tc_coordinator_count' => ['required', 'numeric'],
            'population' => ['required', 'numeric'],
            'services' => ['required', 'string'],
        ]);

        return SBMPTC::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return SBMPTC::with('members')
            ->with('photos')
            ->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SBMPTC  $sBMPTC
     * @return \Illuminate\Http\sbmptc
     */
    public function update(Request $request, SBMPTC $sbmptc)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'tc_coordinator_count' => ['nullable', 'numeric'],
            'population' => ['nullable', 'numeric'],
            'services' => ['nullable', 'string'],
        ]);

        $sbmptc->update($data);
        return $sbmptc;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SBMPTC  $sbmptc
     * @return \Illuminate\Http\Response
     */
    public function destroy(SBMPTC $sbmptc)
    {
        $sbmptc->delete();
        return response('', 204);
    }
}
