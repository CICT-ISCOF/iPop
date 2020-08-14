<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $mode = $request->header('X-Auth-Mode');
        switch ($mode) {
            case 'Pin':
                return $this->checkPin($request);
                break;
            case 'Password':
                return $this->checkPassword($request);
                break;
            default:
                return response(
                    [
                        'errors' => [
                            'x-auth-mode' => ['Invalid authentication mode.'],
                        ],
                    ],
                    400
                );
                break;
        }
    }

    protected function checkPin(Request $request)
    {
        $errors = [];
        foreach (['pin', 'answer', 'question'] as $key) {
            if (!$request->has($key)) {
                $errors[$key] = [ucfirst($key) . ' is required.'];
            }
        }
        if (!empty($errors)) {
            return response(
                [
                    'errors' => $errors,
                ],
                422
            );
        }
        $data = $request->all();
        $user = User::where('pin', $data['pin'])
            ->where('question', $data['question'])
            ->first();
        if (!$user) {
            return response(
                [
                    'errors' => [
                        'pin' => [
                            'Pin or question is not associated to any user.',
                        ],
                    ],
                ],
                404
            );
        }
        if ($user->iterations === 5) {
            return response(
                [
                    'errors' => [
                        'account' => [
                            'This account is blocked. Please contact an Administrator or the developers of this app.',
                        ],
                    ],
                ],
                403
            );
        }
        return $user->authenticate($data, 'pin');
    }

    protected function checkPassword(Request $request)
    {
        $errors = [];
        foreach (['username', 'password'] as $key) {
            if (!$request->has($key)) {
                $errors[$key] = [ucfirst($key) . ' is required.'];
            }
        }
        if (!empty($errors)) {
            return response(
                [
                    'errors' => $errors,
                ],
                422
            );
        }
        $data = $request->all();
        $user = User::where('username', $data['username'])->first();
        if (!$user) {
            return response(
                [
                    'errors' => [
                        'username' => ['Username does not exist.'],
                    ],
                ],
                404
            );
        }
        if ($user->iterations === 5) {
            return response(
                [
                    'errors' => [
                        'account' => [
                            'This account is blocked. Please contact an Administrator or the developers of this app.',
                        ],
                    ],
                ],
                403
            );
        }
        return $user->authenticate($data, 'password');
    }
}
