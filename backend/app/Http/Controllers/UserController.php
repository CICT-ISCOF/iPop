<?php

namespace App\Http\Controllers;

use App\File;
use App\Log;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::orderBy('role')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\RegisterRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(RegisterRequest $request)
    {
        $data = $request->validated();
        Log::record('Created a new ' . $data['role'] . ' user.');
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UserUpdateRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->validated();
        $logMessage = 'Updated a ' . $user->role . ' user.';
        if (isset($data['blocked'])) {
            $data['iterations'] = $data['blocked'] ? 5 : 0;
        }
        if (isset($data['profile_picture'])) {
            $file = File::process($data['profile_picture'], $user);
            $file->public = true;
            if ($user->profilePicture !== null) {
                $user->profilePicture->delete();
            }
            $user->profilePicture()->save($file);
        }
        if ($request->user()->id === $user->id) {
            unset($data['role']);
            unset($data['iterations']);
        }
        if (isset($data['old_password'])) {
            if (!Hash::check($data['old_password'], $user->password)) {
                return response([
                    'errors' => [
                        'password' => ['Old password is incorrect.'],
                    ],
                ]);
            }
            $data['password'] = Hash::make($data['new_password']);
        }
        if (isset($data['old_question'])) {
            if (
                $user->question !== null &&
                $data['old_question'] !== $user->question
            ) {
                return response([
                    'errors' => [
                        'question' => ['Old question is incorrect.'],
                    ],
                ]);
            }
            $data['question'] = $data['new_question'];
        }
        if (isset($data['old_answer'])) {
            if (
                $user->answer !== null &&
                $data['old_answer'] !== $user->answer
            ) {
                return response([
                    'errors' => [
                        'answer' => ['Old answer is incorrect.'],
                    ],
                ]);
            }
            $data['answer'] = $data['new_answer'];
        }
        if (isset($data['old_pin'])) {
            if ($user->pin !== null && $data['old_pin'] !== $user->pin) {
                return response([
                    'errors' => [
                        'answer' => ['Old pin is incorrect.'],
                    ],
                ]);
            }
            $data['pin'] = $data['new_pin'];
        }
        if (isset($data['role'])) {
            $logMessage =
                'Updated a ' .
                $user->role .
                ' user and changed role to ' .
                $data['role'] .
                '.';
        }
        Log::record($logMessage);
        $user->update($data);
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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