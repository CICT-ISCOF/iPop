<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserRoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('permissible.assignees');
    }

    public function assign(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', Rule::exists('users', 'id')],
            'roles' => ['required', 'array'],
            'roles.*' => ['required', Rule::exists('roles', 'name')]
        ]);

        $user = User::find($data['user_id']);
        if ($user->id === $request->user()->id) {
            return response('', 403);
        }
        collect($data['roles'])
            ->each(function ($role) use ($user) {
                if (!$user->hasRole($role)) {
                    $user->assignRole($role);
                }
            });
        $user->save();
        return response('', 204);
    }

    public function remove(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', Rule::exists('users', 'id')],
            'roles' => ['required', 'array'],
            'roles.*' => ['required', Rule::exists('roles', 'name')]
        ]);

        $user = User::find($data['user_id']);
        if ($user->id === $request->user()->id) {
            return response('', 403);
        }
        collect($data['roles'])
            ->each(function ($role) use ($user) {
                if ($user->hasRole($role)) {
                    $user->removeRole($role);
                }
            });
        $user->save();
        return response('', 204);
    }
}
