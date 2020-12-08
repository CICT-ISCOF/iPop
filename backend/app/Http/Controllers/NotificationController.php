<?php

namespace App\Http\Controllers;

use App\Models\User;

class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function all()
    {
        return $this->user()->notifications()
            ->with('notifiable')
            ->get();
    }

    public function markAsRead($id)
    {
        $notification = $this->user()->notifications()->findOrFail($id);

        $notification->markAsRead();

        return response('', 204);
    }

    public function markAllAsRead()
    {
        $this->user()->unreadNotifications()->update(['read_at' => now()]);
        return response('', 204);
    }

    protected function user(): User
    {
        return request()->user();
    }
}
