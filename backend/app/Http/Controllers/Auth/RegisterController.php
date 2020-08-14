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
            'pin' => isset($data['pin']) ? $data['pin'] : null,
            'question' => isset($data['question']) ? $data['question'] : null,
            'answer' => isset($data['answer']) ? $data['answer'] : null,
            'district' => $data['district'],
        ]);
    }
}
