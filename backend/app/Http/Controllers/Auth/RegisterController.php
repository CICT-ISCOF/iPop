<?php

namespace App\Http\Controllers\Auth;

use App\File;
use App\User;
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
        return $user;
    }

    private function create(array $data)
    {
        return User::create($data);
    }
}
