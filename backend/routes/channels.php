<?php

use Illuminate\Support\Facades\Broadcast;

use App\Broadcasting\CommentChannel;
use App\Broadcasting\RecordChannel;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('comment.record.{id}', CommentChannel::class);
Broadcast::channel('record.count', RecordChannel::class);
