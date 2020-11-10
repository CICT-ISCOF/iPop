<?php

namespace App\Http\Controllers;

use App\Models\MunicipalOfficial;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MunicipalOfficialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MunicipalOfficial::sortBy('municipality')
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
            'municipality' => ['required', 'string', Rule::exists('municipalities', 'name')]
        ]);

        return MunicipalOfficial::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MunicipalOfficial  $municipalOfficial
     * @return \Illuminate\Http\Response
     */
    public function show(MunicipalOfficial $municipalOfficial)
    {
        return $municipalOfficial;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MunicipalOfficial  $municipalOfficial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MunicipalOfficial $municipalOfficial)
    {
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'string', 'max:255'],
            'municipality' => ['nullable', 'string', Rule::exists('municipalities', 'name')]
        ]);

        $municipalOfficial->update($data);

        return $municipalOfficial;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MunicipalOfficial  $municipalOfficial
     * @return \Illuminate\Http\Response
     */
    public function destroy(MunicipalOfficial $municipalOfficial)
    {
        $municipalOfficial->delete();
        return response('', 204);
    }
}
