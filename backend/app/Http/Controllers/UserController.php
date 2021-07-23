<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Log;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        return User::with('profilePicture')
            ->with('roles.permissions')
            ->with('permissions')
            ->paginate(10);
    }

    public function store(RegisterRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            $file->save();
            $user->profile_picture_id = $file->id;
            $user->profilePicture = $file;
        }
        $role = Role::findByName($data['role']);
        $user->assignRole($role);
        $user->save();
        Log::record('Created a new ' . $role->name . ' user.');
        return $user;
    }

   
    public function show($id)
    {
        return User::with('profilePicture')
            ->with('roles.permissions')
            ->with('permissions')
            ->findOrFail($id);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['blocked'])) {
            $data['iterations'] = $data['blocked'] ? 5 : 0;
        }

        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            $oldFile = $user->profilePicture;
            unset($user->profilePicture);
            $file->save();
            $user->profile_picture_id = $file->id;
            $user->save();
            $user->profilePicture = $file;
            if ($oldFile instanceof File) {
                $oldFile->delete();
            }
        }
        if ($request->user()->id === $user->id) {
            unset($data['role']);
            unset($data['iterations']);
        }
        if (isset($data['new_password'])) {
            if (!Hash::check($data['old_password'], $user->password)) {
                return response(
                    [
                        'errors' => [
                            'password' => ['Old password is incorrect.'],
                        ],
                    ],
                    422
                );
            }
            $data['password'] = Hash::make($data['new_password']);
        }
        if (isset($data['new_question'])) {
            if (
                $user->question !== null &&
                $data['old_question'] !== $user->question
            ) {
                return response(
                    [
                        'errors' => [
                            'question' => ['Old question is incorrect.'],
                        ],
                    ],
                    422
                );
            }
            $data['question'] = $data['new_question'];
        }
        if (isset($data['new_answer'])) {
            if (
                $user->answer !== null &&
                $data['old_answer'] !== $user->answer
            ) {
                return response(
                    [
                        'errors' => [
                            'answer' => ['Old answer is incorrect.'],
                        ],
                    ],
                    422
                );
            }
            $data['answer'] = $data['new_answer'];
        }
        if (isset($data['new_pin'])) {
            if ($user->pin !== null && $data['old_pin'] !== $user->pin) {
                return response(
                    [
                        'errors' => [
                            'answer' => ['Old pin is incorrect.'],
                        ],
                    ],
                    422
                );
            }
            $data['pin'] = $data['new_pin'];
        }

        Log::record("{$user->fullname}'s profile was updated.");
        unset($user->profilePicture);
        $user->update($data);
        if ($user->isBlocked()) {
            $user->tokens->each(function ($token) {
                $token->delete();
            });
        }

        if (isset($data['role'])) {
            $role = Role::findByName($data['role']);
            $user->roles()->sync($role);
        }

        return User::with('profilePicture')
            ->with('roles.permissions')
            ->with('permissions')
            ->findOrFail($user->id);
    }

    public function destroy(Request $request, User $user)
    {
        if ($request->user()->id === $user->id) {
            return response(
                [
                    'errors' => [
                        'account' => [
                            'Unable to delete currently logged account.',
                        ],
                    ],
                ],
                403
            );
        }
        Log::record('Deleted a user.');
        $user->delete();
        return response('', 201);
    }
}
