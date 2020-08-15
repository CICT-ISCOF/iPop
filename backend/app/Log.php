<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $fillable = ['user_id', 'ip_address', 'user_agent', 'action'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function record(string $action)
    {
        $request = request();
        $user = $request->user();
        $ip = $request->ip();
        $agent = $request->userAgent();
        return self::create([
            'user_id' => $user instanceof User ? $user->id : null,
            'ip_address' => $ip,
            'user_agent' => $agent,
            'action' => $action,
        ]);
    }
}
