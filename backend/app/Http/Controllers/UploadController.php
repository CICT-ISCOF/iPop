<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Role;
use App\Models\Upload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UploadController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }


    public function index(Request $request)
    {
        $builder = Upload::with([
            'file',
            'user'
        ]);

        if ($request->has('type')) {
            $builder = $builder->where('type', $request->get('type'));
        }

        return $builder->get();
    }

    public function approvals(Request $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = $request->user();
        $builder = Upload::where('type', $request->get('type'));

        /**
            4.Super Admin (Province)
            4.TRD (Province)
            3.FOD (District)
            2.PPOII (Municipality)
        	1.PPOI (Barangay)
         */
        if ($user->hasRole(Role::TRD)) {
            $builder = $builder->whereHas('user.roles', function (Builder $builder) {
                return $builder->whereNotIn('name', [Role::ADMIN, Role::TRD]);
            });
        } else if ($user->hasRole(Role::FOD)) {
            $builder = $builder->whereHas('user.roles', function (Builder $builder) {
                return $builder->whereNotIn('name', [Role::ADMIN, Role::TRD, Role::FOD]);
            });
        } else if ($user->hasRole(Role::PPO_TWO)) {
            $builder = $builder->whereHas('user', function (Builder $builder) use ($user) {
                return $builder->where('assigned_municipality', $user->assigned_municipality)
                    ->whereHas('roles', function (Builder $builder) {
                        return $builder->whereNotIn('name', [Role::ADMIN, Role::TRD, Role::FOD, Role::PPO_TWO]);
                    });
            });
        } else if ($user->hasRole(Role::PPO_ONE)) {
            $builder = $builder->where('user_id', $user->id);
        }

        return $builder->with([
                'file',
                'user'
            ])->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'file' => ['required', 'file'],
            'type' => ['required', 'string'],
        ]);

        $file = File::process($data['file']);
        $file->public = true;
        $file->save();

        $user = $request->user();
        return Upload::create([
            'user_id' => $user->id,
            'file_id' => $file->id,
            'type' => $data['type']
        ]);
    }

    public function show(Upload $upload)
    {
        $upload->load(['user', 'file']);
        return $upload;
    }

    public function update(Request $request, Upload $upload)
    {
        $data = $request->validate([
            'approved' => ['nullable', 'boolean'],
        ]);

        $upload->update($data);
        $upload->load(['user', 'file']);
        return $upload;
    }


    public function destroy(Upload $upload)
    {
        $upload->delete();
        return response('', 204);
    }
}
