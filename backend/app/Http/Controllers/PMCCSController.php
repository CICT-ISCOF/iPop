<?php

namespace App\Http\Controllers;

use App\Models\PMCCS;
use Illuminate\Http\Request;

class PMCCSController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $builder = new PMCCS();

        foreach ($request->all() as $key => $value) {
            $builder = $builder->where($key, $value);
        }

        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $model = PMCCS::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();

        if ($model) {
            $model->update($data);
        } else {
            $model = PMCCS::create($data);
        }

        return $model;
    }

    public function show($id)
    {
        return PMCCS::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PMCCS::findOrFail($id);

        $model->update($request->all());

        return $model;
    }

    public function destroy($id)
    {
        $model = PMCCS::findOrFail($id);

        $model->delete();

        return response('', 204);
    }
}
