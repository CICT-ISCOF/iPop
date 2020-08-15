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

    /**
     * Records an activity to the database.
     *
     * @param string $action
     * @return \App\Log $log
     */
    public static function record(string $action, $substituteID = null)
    {
        $request = request();
        $user = $request->user();
        $ip = $request->ip();
        $agent = $request->userAgent();
        return self::create([
            'user_id' => $user instanceof User ? $user->id : $substituteID,
            'ip_address' => $ip,
            'user_agent' => $agent,
            'action' => $action,
        ]);
    }
}
