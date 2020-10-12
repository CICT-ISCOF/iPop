<?php

namespace App\Http\Controllers\CMS;

use App\Http\Requests\CMS\ArticleRequest;
use App\Models\CMS\Article;
use App\Models\File;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Article::with('link')
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\CMS\ArticleRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticleRequest $request)
    {
        $data = $request->validated();
        $file = File::process($data['file']);
        $file->public = true;
        $file->save();
        $data['file_id'] = $file->id;
        $article = Article::create($data);
        return Article::with('link')
            ->findOrFail($article->id);;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Article::with('link')
            ->findOrFail($id);
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
        $article->update($request->only(['title', 'description']));
        if ($request->has('file')) {
            $data = $request->validate([
                'file' => ['isFile']
            ]);
            $file = File::process($data['file']);
            $file->public = true;
            $article->file->delete();
            $article->file()->save($file);
        }
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
        $article->delete();
        return response('', 204);
    }
}
