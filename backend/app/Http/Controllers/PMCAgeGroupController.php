<?php

namespace App\Http\Controllers;

use App\Models\PMCAgeGroup;
use Illuminate\Http\Request;

class PMCAgeGroupController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $builder = new PMCAgeGroup();

        foreach ($request->all() as $key => $value) {
            $builder = $builder->where($key, $value);
        }

        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $model = PMCAgeGroup::where('municipality', $data['municipality'])
            ->where('barangay', $data['barangay'])
            ->where('year', $data['year'])
            ->first();

        if ($model) {
            $model->update($data);
        } else {
            $model = PMCAgeGroup::create($data);
        }

        return $model;
    }

    public function show($id)
    {
        return PMCAgeGroup::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PMCAgeGroup::findOrFail($id);

        $model->update($request->all());

        return $model;
    }

    public function destroy($id)
    {
        $model = PMCAgeGroup::findOrFail($id);

        $model->delete();

        return response('', 204);
    }
}
