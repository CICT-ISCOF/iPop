<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\Role;

class RoleController extends Controller
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

    public function show(Request $request, Role $role)
    {
        return $role;
    }

    public function store(Request $request)
    {
        $data = $request->validate(['name' => [
            'required',
            'string',
            Rule::unique('roles', 'name')
        ]]);

        return Role::create($data);
    }

    public function destroy(Request $request, Role $role)
    {
        if ($role->name === 'Super Admin') {
            return response('', 403);
        }

        User::role($role->name)->get()
            ->each(function ($user) use ($role) {
                $user->removeRole($role->name);
            });
        $role->delete();
        return response('', 204);
    }
}
