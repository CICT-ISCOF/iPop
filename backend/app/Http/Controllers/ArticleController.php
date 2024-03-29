<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Article;
use App\Models\ArticlePhoto;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use InvalidArgumentException;

class ArticleController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only('store', 'update', 'destroy');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Article::getApproved()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string'],
            'body' => ['required', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required'],
        ]);

        $article = Article::create($data);

        $article->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add an article.'),
        ]));
        $article->setApproved($request->user()->hasRole(Role::ADMIN));

        if (isset($data['files'])) {
            collect($data['files'])
                ->each(function ($rawFile) use ($article) {
                    try {
                        $file = File::process($rawFile);
                        $file->public = true;
                        $file->save();
                        $photo = new ArticlePhoto([
                            'file_id' => $file->id,
                        ]);
                        $article->photos()->save($photo);
                    } catch (InvalidArgumentException $e) {
                    }
                });
        }
        $article->load('photos');
        Log::record("User created an article.");
        return $article;
    }

    /**
     * Display the specified resource.
     *
     * @param  int|string $article
     * @return \Illuminate\Http\Response
     */
    public function show($article)
    {
        $article = Article::where('slug', $article)
            ->orWhere('id', $article)
            ->first();
        if (!$article) {
            return response('', 404);
        }
        return Article::findApproved($article->id)->first()
            ?: response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string'],
            'body' => ['nullable', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required'],
            'truncate' => [Rule::requiredIf(function () use ($request) {
                return $request->has('files');
            }), 'boolean']
        ]);

        $article->update($data);

        if (isset($data['files'])) {
            if ($data['truncate']) {
                $article->photos->each(function ($photo) {
                    $photo->delete();
                });
            }
            collect($data['files'])
                ->each(function ($rawFile) use ($article) {
                    try {
                        $file = File::process($rawFile);
                        $file->public = true;
                        $file->save();
                        $photo = new ArticlePhoto([
                            'file_id' => $file->id,
                        ]);
                        $article->photos()->save($photo);
                    } catch (InvalidArgumentException $e) {
                        Log::record('User\'s attempt to upload file has failed.', null, $e->__toString());
                    }
                });
        }

        $article->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update an article.'));

        Log::record("User updated an article.");

        return $article;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article->makeDeleteRequest();
        Log::record("User deleted an article.");

        return response('', 204);
    }

    public function today()
    {
        $now = now();
        return Article::getApproved()
            ->whereDate('created_at', $now)
            ->whereDay('created_at', $now->day)
            ->whereMonth('created_at', $now->month)
            ->get();
    }

    public function week()
    {
        $now = now();
        return Article::getApproved()
            ->whereBetween('created_at', [
                $now->startOfWeek(),
                $now->endOfWeek(),
            ])->get();
    }

    public function month()
    {
        $now = now();
        return Article::getApproved()
            ->whereDate('created_at', $now)
            ->whereMonth('created_at', $now->month)
            ->get();
    }
}
