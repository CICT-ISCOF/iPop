<?php

namespace App\Http\Controllers;

use App\Models\BarangayOfficial;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BarangayOfficialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BarangayOfficial::sortBy('barangay')
            ->paginate(15);
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
            'position' => ['nullable', 'string', 'max:255'],
            'barangay' => ['required', 'string', Rule::exists('barangays', 'name')]
        ]);

        return BarangayOfficial::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BarangayOfficial  $barangayOfficial
     * @return \Illuminate\Http\Response
     */
    public function show(BarangayOfficial $barangayOfficial)
    {
        return $barangayOfficial;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BarangayOfficial  $barangayOfficial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BarangayOfficial $barangayOfficial)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', Rule::exists('barangays', 'name')]
        ]);

        $barangayOfficial->update($data);

        return $barangayOfficial;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BarangayOfficial  $barangayOfficial
     * @return \Illuminate\Http\Response
     */
    public function destroy(BarangayOfficial $barangayOfficial)
    {
        $barangayOfficial->delete();

        return response('', 204);
    }
}
