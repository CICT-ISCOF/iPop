<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function comments(Request $request)
    {
        $channels = array();
        foreach($request->user()->records as $record)
        {
            $channels[] = 'comment.record.' . $record->id;
        }
        return $channels;
    }
}
