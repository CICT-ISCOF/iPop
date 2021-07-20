<?php

namespace App\Http\Controllers;

use App\Models\PopulationPyramid;
use Illuminate\Http\Request;

class PopulationPyramidController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $builder = new PopulationPyramid();

        foreach ($request->all() as $key => $value) {
            if($value === null || $value === 'null' ){
                $builder->whereNull( $key); 
            }else{
                $builder = $builder->where($key, $value);
            }
        }

        return $builder->get();
    }
 
    public function store(Request $request)
    {
        $data = $request->all();
        $model = [];
         
        if($data['municipality'] === null || $data['municipality'] === 'null'){
            $model = PopulationPyramid::where('year', $data['year'])
                    ->first();
        }
        
        if($data['barangay'] === null || $data['barangay'] === 'null'){
            $model = PopulationPyramid::where('year', $data['year'])
                    ->where('municipality', $data['municipality'])
                    ->first();
        }
        if($data['municipality'] === null || $data['municipality'] !== 'null' && $data['barangay'] !== null || $data['barangay'] === 'null'){
            $model = PopulationPyramid::where('municipality', $data['municipality'])
                    ->where('barangay', $data['barangay'])
                    ->where('year', $data['year'])
                    ->first();
        }
     
        if ($model) {
            $model->update($data);
        } else {
            $model = PopulationPyramid::create($data);
        }

        return $model;
    }

    public function show($id)
    {
        return PopulationPyramid::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PopulationPyramid::findOrFail($id);
        $model->update($request->all());
        return $model;
    }

    public function destroy($id)
    {
        $model = PopulationPyramid::findOrFail($id);
        $model->delete();
        return response('', 204);
    }
}
