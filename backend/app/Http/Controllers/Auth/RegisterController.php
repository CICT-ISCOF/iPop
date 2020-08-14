<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;
use App\Http\Requests\RegisterRequest as Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        return $this->create($data);
    }

    private function create(array $data)
    {
        return User::create($data);
    }
}
