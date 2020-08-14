<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens {
        createToken as sanctumCreateToken;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        // 'email',
        'username',
        'password',
        'fullname',
        'barangay',
        'municipality',
        'role',
        'pin',
        'question',
        'answer',
        'district',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'pin', 'answer'];

    /**
     * Override from HasApiTokens trait.
     * Predefine user abilities according to access level.
     *
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function createToken($name = null, $abilities = ['*'])
    {
        $ip = request()->ip();
        return $this->sanctumCreateToken(
            $name ? "{$name}|{$ip}" : "null|{$ip}",
            $abilities
        );
    }

    public function authenticate($data, $mode)
    {
        $mode = strtolower($mode);
        if ($mode === 'pin') {
            if ($data['answer'] !== $this->answer) {
                return response(
                    [
                        'errors' => [
                            'answer' => ['Answer incorrect.'],
                        ],
                    ],
                    401
                );
            } else {
                $token = $this->createToken();
                return response([
                    'user' => $this,
                    'token' => $token->plainTextToken,
                ]);
            }
        }
        if (Hash::check($data[$mode], $this->{$mode})) {
            $token = $this->createToken();
            return response([
                'user' => $this,
                'token' => $token->plainTextToken,
            ]);
        }
        return response(
            [
                'errors' => [
                    $mode => ['Invalid ' . $mode],
                ],
            ],
            401
        );
    }
}
