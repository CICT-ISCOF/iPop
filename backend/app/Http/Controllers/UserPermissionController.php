<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserPermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware('permissible.assignees');
    }

    public function assign(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', Rule::exists('users', 'id')],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', Rule::exists('permissions', 'name')]
        ]);

        $user = User::find($data['user_id']);
        if ($user->id === $request->user()->id) {
            return response('', 403);
        }
        collect($data['permissions'])
            ->each(function ($permission) use ($user) {
                if (!$user->hasPermissionTo($permission)) {
                    $user->givePermissionTo($permission);
                }
            });
        $user->save();
        return response('', 204);
    }

    public function remove(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', Rule::exists('users', 'id')],
            'permissions' => ['required', 'array'],
            'permissions.*' => ['required', Rule::exists('permissions', 'name')]
        ]);

        $user = User::find($data['user_id']);
        if ($user->id === $request->user()->id) {
            return response('', 403);
        }
        collect($data['permissions'])
            ->each(function ($permission) use ($user) {
                if ($user->hasPermissionTo($permission)) {
                    $user->revokePermissionTo($permission);
                }
            });
        $user->save();
        return response('', 204);
    }
}
