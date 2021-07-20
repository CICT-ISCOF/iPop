<?php

namespace App\Http\Controllers;

use App\Models\PMCESS;
use Illuminate\Http\Request;

class PMCESSController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
    }

    public function index(Request $request)
    {
        $builder = new PMCESS();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                     $builder = $builder->whereNull( $key ); 
                }else{
                     $builder = $builder->where( $key, $value );
                }
            }
        }
        return $builder->get();
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $builder = new PMCESS();
        foreach ($request->all() as $key => $value) {
            if( $key === 'barangay' || $key === 'municipality'){
                if( $value === 'null' ){
                     $builder = $builder->whereNull( $key ); 
                }else{
                     $builder = $builder->where( $key, $value );
                }
            }
        }
        $model = $builder->first();
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
