<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Role;

class RolePermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permissible.assignees');
    }

    public function index()
    {
        return Role::with('permissions')
            ->get();
    }

    public function assign(Request $request)
    {
        $data = $request->validate([
            'role' => ['required', Rule::exists('roles', 'name')],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', Rule::exists('permissions', 'name')]
        ]);

        $role = Role::findByName($data['role']);
        collect($data['permissions'])
            ->each(function ($permission) use ($role) {
                if (!$role->hasPermissionTo($permission)) {
                    $role->givePermissionTo($permission);
                }
            });
        $role->save();

        return response('', 204);
    }

    public function remove(Request $request)
    {
        $data = $request->validate([
            'role' => ['required', Rule::exists('roles', 'name')],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', Rule::exists('permissions', 'name')]
        ]);

        $role = Role::findByName($data['role']);
        collect($data['permissions'])
            ->each(function ($permission) use ($role) {
                if ($role->hasPermissionTo($permission)) {
                    $role->revokePermissionTo($permission);
                }
            });
        $role->save();

        return response('', 204);
    }
}
