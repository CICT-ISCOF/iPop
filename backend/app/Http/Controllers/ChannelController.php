<?php

namespace App\Http\Controllers;

use App\Models\Comment;
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

        $comments = Comment::where('user_id', $request->user()->id)
            ->with('commentable')
            ->get();

        $ids = [];

        foreach ($comments as $comment) {
            if (!in_array($comment->commentable->id, $ids)) {
                $ids[] = $comment->commentable->id;
            }
        }

        foreach ($ids as $id) {
            $comments[] = 'comments.record.' . $id;
        }

        return $comments;
    }

    public function record()
    {
        return 'record.count';
    }
}
