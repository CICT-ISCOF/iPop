<?php

namespace App\Broadcasting;

use App\Models\User;
use App\Models\Record;

class CommentChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\User  $user
     * @return array|bool
     */
    public function join(User $user, Record $record)
    {
        return $record->recordable
            ->comments()
            ->where('user_id', $user->id)
            ->count() > 0;
    }
}
