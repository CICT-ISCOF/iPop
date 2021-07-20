<?php

namespace App\Http\Controllers;

use App\Models\PMCAMIS;
use Illuminate\Http\Request;

class PMCAMISController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);;
    }

    public function index(Request $request)
    {
        $builder = new PMCAMIS();
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
        $builder = PMCAMIS::getApproved();
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
            $model = PMCAMIS::create($data);
        }
        return $model;
    }

    public function show($id)
    {
        return PMCAMIS::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $model = PMCAMIS::findOrFail($id);
        $model->update($request->all());
        return $model;
    }

    public function destroy($id)
    {
        $model = PMCAMIS::findOrFail($id);
        $model->delete();
        return response('', 204);
    }
}
