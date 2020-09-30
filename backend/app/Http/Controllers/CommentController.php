<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Birth;
use App\Models\Death;
use App\Models\CPDB;
use App\Models\Marriage;
use App\Models\InMigration;
use App\Models\OutMigration;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CommentRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequest $request)
    {
        $data = $request->validated();
        $models = [
            'Birth' => Birth::class,
            'Death' => Death::class,
            'CPDB' => CPDB::class,
            'InMigration' => InMigration::class,
            'OutMigration' => OutMigration::class,
            'Marriage' => Marriage::class,
        ];
        $model = $models[$data['type']];
        $model = $model::find($data['commentable_id']);
        if (!$model) {
            return response(
                [
                    'errors' => [
                        'commentable_id' => [
                            'ID does not exist in ' . $data['type'] . 's.',
                        ],
                    ],
                ],
                422
            );
        }
        $comment = new Comment($data);
        $comment->user_id = $request->user()->id;
        $model->comments()->save($comment);
        return $comment;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        return $comment;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        $comment->update($request->only(['body', 'noted']));
        return $comment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response('', 204);
    }
}
