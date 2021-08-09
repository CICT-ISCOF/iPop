<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use Notifiable, HasFactory;
    use HasApiTokens {
        createToken as _sanctumCreateToken;
    }
    use HasRoles {
        hasRole as _parentHasRole;
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'password',
        'fullname',
        'barangay',
        'municipality',
        'pin',
        'question',
        'answer',
        'district',
        'iterations',
        'assigned_municipality',
        'assigned_barangay',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'pin', 'answer'];

    protected $appends = ['blocked'];

    protected static function booted()
    {
        static::updated(function (self $user) {
            if ($user->isBlocked()) {
                $user->tokens()->delete();
            }
        });

        static::deleting(function ($user) {
            if ($user->profilePicture instanceof File) {
                $user->files()->delete();
                $user->profilePicture->delete();
            }
        });
    }

    public function hasRole($roles, ?string $guard = null): bool
    {
        return $this->_parentHasRole($roles, 'web');
    }

    public function makeMessage($message)
    {
        return $this->fullname . ' ' . $message;
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function records()
    {
        return $this->hasMany(Record::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function profilePicture()
    {
        return $this->belongsTo(File::class, 'profile_picture_id');
    }

    /**
     * Checks if the user is a Super Admin.
     *
     * @return boolean $isAdministrator
     */
    public function isAdministrator()
    {
        return $this->role === 'Super Admin';
    }

    public function verifyPermissions($permissions)
    {
        return $this->hasRole(Role::ADMIN) || $this->hasAllPermissions($permissions);
    }

    public function getBlockedAttribute()
    {
        return $this->isBlocked();
    }

    /**
     * Checks if the user's account is blocked.
     *
     * @return boolean $blocked
     */
    public function isBlocked()
    {
        return $this->iterations === 5;
    }

    /**
     * Override from HasApiTokens trait.
     * Predefine user abilities according to access level.
     *
     * @return \Laravel\Sanctum\NewAccessToken
     */
    public function createToken($name = 'null', $abilities = ['*'])
    {
        $this->iterations = 0;
        $this->save();
        $ip = request()->ip();
        Log::record('User logged in successfully.', $this->id);
        return $this->_sanctumCreateToken("{$name}|{$ip}", $abilities);
    }

    public function authenticate($data, $mode)
    {
        $mode = strtolower($mode);
        if ($mode === 'pin') {
            if ($data['answer'] !== $this->answer) {

                Log::record('User failed to login.', $this->id);

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

        Log::record('User failed to login.', $this->id);

        return $this->_iterate(
            [
                'errors' => [
                    $mode => ['Invalid ' . $mode],
                ],
            ],
            401
        );
    }

    public function bulkRequests()
    {
        return $this->hasMany(BulkImportRequest::class);
    }

    /**
     * Search for users in the database.
     *
     * @param string $field
     * @param string $value
     * @return \Illuminate\Http\Response
     */
    public static function search($query)
    {
        $collection = self::where('username', 'LIKE', "%{$query}%")
            ->orWhere('fullname', 'LIKE', "%{$query}%")
            ->orderBy('role')
            ->with([
                'profilePicture',
                'roles',
                'permissions'
            ])
            ->get();

        if ($collection->isEmpty()) {
            return response(
                [
                    'errors' => [
                        'query' => ['No results found.'],
                    ],
                ],
                404
            );
        }

        return response($collection);
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
            $data['attempts'] = $this->iterations;
            return response($data, $status);
        }
    }
}
