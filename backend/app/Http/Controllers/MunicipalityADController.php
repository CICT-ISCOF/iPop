<?php

namespace App\Http\Controllers;

use App\Models\MunicipalityAD;
use Illuminate\Http\Request;

class MunicipalityADController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        $builder = new MunicipalityAD();

        foreach ($request->all() as $key => $value) {
            $builder = $builder->where($key, $value);
        }

        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $model = MunicipalityAD::where('municipality', $data['municipality'])
            ->where('year', $data['year'])
            ->first();

        if ($model) {
            $model->update($data);
        } else {
            $model = MunicipalityAD::create($data);
        }

        return $model;
    }

    public function show($id)
    {
        return MunicipalityAD::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = MunicipalityAD::findOrFail($id);

        $model->update($request->all());

        return $model;
    }

    public function destroy($id)
    {
        $model = MunicipalityAD::findOrFail($id);

        $model->delete();

        return response('', 204);
    }
}
