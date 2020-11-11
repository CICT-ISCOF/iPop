<?php

namespace App\Http\Controllers\Auth;

use App\Models\File;
use App\Models\Log;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest as Request;
use App\Models\Role;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validated();
        $role = Role::findByName($data['role']);
        $data['password'] = Hash::make($data['password']);
        $user = $this->create($data);
        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            $file->save();
            $user->profile_picture_id = $file->id;
        }
        $user->assignRole($role);
        $user->save();
        Log::record('Created a new ' . $role->name . ' user.');
        return $user;
    }

    public function viewer(Request $request)
    {
        $data = $request->validated();
        $role = Role::findByName('Viewer');
        $data['password'] = Hash::make($data['password']);
        $user = $this->create($data);
        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            $file->save();
            $user->profile_picture_id = $file->id;
        }
        $user->assignRole($role);
        $user->save();
        Log::record('Created a new ' . $role->name . ' user.');
        return $user;
    }

    private function create(array $data): User
    {
        return User::create($data);
    }
}
