<?php

namespace App\Http\Controllers\Auth;

use App\Models\File;
use App\Models\Log;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest as Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = $this->create($data);
        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            $file->save();
            $user->profile_picture_id = $file->id;
            $user->save();
        }
        Log::record('Created a new ' . $user->role . ' user.');
        return $user;
    }

    public function viewer(Request $request)
    {
        $data = $request->validated();
        $data['role'] = 'Viewer';
        $data['password'] = Hash::make($data['password']);
        $user = $this->create($data);
        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            $file->save();
            $user->profile_picture_id = $file->id;
            $user->save();
        }
        Log::record('Created a new ' . $user->role . ' user.');
        return $user;
    }

    private function create(array $data)
    {
        return User::create($data);
    }
}
