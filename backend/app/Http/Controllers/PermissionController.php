<?php

namespace App\Http\Controllers;

use App\Models\RequiredPermission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Permission;
use App\Models\Role;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permissible.assignees');
    }

    public function index()
    {
        return Permission::paginate(10);
    }

    public function show(Request $request, Permission $permission)
    {
        return $permission;
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => [
            'required',
            'string',
            Rule::unique('permissions', 'name')
        ]]);

        return Permission::create($data);
    }

    public function destroy(Request $request, Permission $permission)
    {
        if ($permission->name === 'Assign Permissions') {
            return response('', 403);
        }

        Role::permission($permission->name)->get()
            ->each(function ($role) use ($permission) {
                $role->revokePermissionTo($permission);
            });

        User::permission($permission->name)->get()
            ->each(function ($user) use ($permission) {
                $user->revokePermissionTo($permission);
            });

        RequiredPermission::where('permission_id', $permission->id)
            ->delete();

        $permission->delete();
        return response('', 204);
    }
}
