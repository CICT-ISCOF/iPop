<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest as Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validated();
        return $this->create($data);
    }

    private function create(array $data)
    {
        return User::create([
            // 'email' => $data['email'],
            'username' => $data['username'],
            'password' => Hash::make($data['password']),
            'fullname' => $data['fullname'],
            'barangay' => $data['barangay'],
            'municipality' => $data['municipality'],
            'role' => $data['role'],
            'pin' => Hash::make($data['pin']),
            'question' => $data['question'],
            'answer' => $data['answer'],
            'district' => $data['district'],
        ]);
    }
}
