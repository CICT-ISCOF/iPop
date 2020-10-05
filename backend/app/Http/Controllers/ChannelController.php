<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function index(Request $request)
    {
        return [
            'comments' => $this->comments($request),
            'record' => $this->record(),
        ];
    }

    public function comments(Request $request)
    {
        $comments = [];
        foreach ($request->user()->records as $record) {
            $comments[] = 'comment.record.' . $record->id;
        }

        return $comments;
    }

    public function record()
    {
        return 'record.count';
    }
}
