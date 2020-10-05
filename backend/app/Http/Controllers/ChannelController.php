<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function comments(Request $request)
    {
        $comments = array();
        foreach ($request->user()->records as $record) {
            $comments[] = 'comment.record.' . $record->id;
        }
        return array(
            'comments' => $comments,
            'record' => 'record.count'
        );
    }
}
