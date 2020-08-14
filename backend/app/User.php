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
        createToken as _sanctumCreateToken;
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
        'iterations',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'pin', 'answer'];

    protected $appends = ['blocked'];

    public function getBlockedAttribute()
    {
        return $this->iterations === 5;
    }

    /**
     * Override from HasApiTokens trait.
     * Predefine user abilities according to access level.
     *
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function createToken($name = null, $abilities = ['*'])
    {
        $this->iterations = 0;
        $this->save();
        $ip = request()->ip();
        return $this->_sanctumCreateToken(
            $name ? "{$name}|{$ip}" : "null|{$ip}",
            $abilities
        );
    }

    public function authenticate($data, $mode)
    {
        $mode = strtolower($mode);
        if ($mode === 'pin') {
            if ($data['answer'] !== $this->answer) {
                return $this->_interate(
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
        return $this->_iterate(
            [
                'errors' => [
                    $mode => ['Invalid ' . $mode],
                ],
            ],
            401
        );
    }

    /**
     * Increment the amount of times a user has attempted to log in.
     *
     * @param array $data
     * @param int $status
     */
    private function _iterate(array $data = [], int $status = 401)
    {
        $iterations = $this->iterations;
        if ($iterations === 5 || $iterations + 1 === 5) {
            $this->iterations = 5;
            $this->save();
            return response(
                [
                    'errors' => [
                        'account' => [
                            'The account associated with the credentials provided is blocked.',
                        ],
                    ],
                ],
                403
            );
        } else {
            $this->iterations++;
            $this->save();
            $data['tries'] = $this->iterations;
            return response($data, $status);
        }
    }
}
