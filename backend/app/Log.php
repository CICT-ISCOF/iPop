<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log as NativeLog;
use Jenssegers\Agent\Agent;
use Exception;

class Log extends Model
{
    protected $fillable = ['user_id', 'ip_address', 'user_agent', 'action', 'info'];

    public function getInfoAttribute()
    {
        return json_decode($this->attributes['info']);
    }

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
        $agent = new Agent();
        $request = request();
        $agent->setUserAgent($request->userAgent());
        $user = $request->user();
        $ip = $request->ip();
        $user_agent = $request->userAgent();
        if($agent->isPhone())
        {
            $user_agent = $agent->device() . ' | ' . $agent->deviceType();
        }
        if($agent->isDesktop())
        {
             $user_agent = $agent->browser() . ' | ' . $agent->deviceType();
        }

        $data = [
            'user_id' => $user instanceof User ? $user->id : $substituteID,
            'ip_address' => $ip,
            'user_agent' => $user_agent,
            'action' => $action,
            'info' => geoip()->getLocation($ip)->toArray(),
        ];

        NativeLog::info(json_encode($data));

        $data['info'] = json_encode($data['info']);

        return self::create($data);
    }
}
