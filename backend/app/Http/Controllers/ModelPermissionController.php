<?php

namespace App\Http\Controllers;

use App\Models\Birth;
use App\Models\CPDB;
use App\Models\InMigration;
use App\Models\Marriage;
use App\Models\OutMigration;
use App\Models\RequiredPermission;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Permission;

class ModelPermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permissible.assignees');
    }

    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $builder = RequiredPermission::with('permission')
            ->sortBy('permissible');
        if ($request->has('model')) {
            $model = $request->get('model');
            $models = [
                'Birth' => Birth::class,
                'CPDB' => CPDB::class,
                'Death' => DeatH::class,
                'InMigration' => InMigration::class,
                'Marriage' => Marriage::class,
                'OutMigration' => OutMigration::class,
            ];

            if (!in_array($model, array_keys($models))) {
                return response([
                    'message' => 'Invalid model.'
                ], 400);
            }
            $builder->where('permissible', $models[$model]);
        }
        return $builder->all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $models = [
            'Birth' => Birth::class,
            'CPDB' => CPDB::class,
            'Death' => DeatH::class,
            'InMigration' => InMigration::class,
            'Marriage' => Marriage::class,
            'OutMigration' => OutMigration::class,
        ];

        $data = $request->validate([
            'permissible' => [
                'required',
                'string',
                Rule::in(array_keys($models))
            ],
            'permission' => [
                'required',
                'string',
                Rule::exists('permissions', 'name')
            ]
        ]);

        $data['permissible'] = $models[$data['permissible']];

        $permission = Permission::findByName($data['permission']);

        if (!$permission) {
            return response([
                'errors' => [
                    'permission' => 'Permission does not exist.'
                ]
            ], 422);
        }

        $data['permission_id'] = $permission->id;

        return RequiredPermission::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return RequiredPermission::with('permission')
            ->findOrFail($id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RequiredPermission
     * @return \Illuminate\Http\Response
     */
    public function destroy(RequiredPermission $requiredPermission)
    {
        $requiredPermission->delete();
        return response('', 204);
    }
}
