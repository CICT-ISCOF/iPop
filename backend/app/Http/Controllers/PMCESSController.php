<?php

namespace App\Http\Controllers;

use App\Models\PMCESS;
use Illuminate\Http\Request;

class PMCESSController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $builder = new PMCESS();

        foreach ($request->all() as $key => $value) {
            $builder = $builder->where($key, $value);
        }

        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $model = PMCESS::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();

        if ($model) {
            $model->update($data);
        } else {
            $model = PMCESS::create($data);
        }

        return $model;
    }

    public function show($id)
    {
        return PMCESS::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PMCESS::findOrFail($id);

        $model->update($request->all());

        return $model;
    }

    public function destroy($id)
    {
        $model = PMCESS::findOrFail($id);

        $model->delete();

        return response('', 204);
    }
}
