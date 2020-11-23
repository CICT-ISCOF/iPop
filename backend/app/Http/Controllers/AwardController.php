<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\CMS\Award;
use App\Models\CMS\AwardMedia;
use App\Models\File;
use App\Models\Role;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Award::getApproved()->get();
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
            'title' => ['required', 'string', 'max:255'],
            'url' => ['nullable', 'string', 'url'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'isFile'],
        ]);

        $award = Award::create($data);

        if (isset($data['files'])) {
            collect($data['files'])
                ->map(function ($file) {
                    $file = File::process($file);
                    $file->public = true;
                    $file->save();
                    return $file;
                })
                ->each(function ($file) use ($award) {
                    AwardMedia::create([
                        'award_id' => $award->id,
                        'file_id' => $file->id,
                    ]);
                });
        }
        $award->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $award->setApproved($request->user()->hasRole(Role::ADMIN));

        $award->load('medias');
        return $award;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function show(Award $award)
    {
        return Award::findApproved($award->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Award $award)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'url' => ['nullable', 'string', 'url'],
            'files' => ['nullable', 'array'],
            'files.*' => ['nullable', 'isFile'],
            'truncate_media' => ['nullable', 'boolean']
        ]);

        if (isset($data['truncate_media'])) {
            $award->medias->each(function ($media) {
                $media->delete();
            });
        }

        if (isset($data['files'])) {
            collect($data['files'])
                ->map(function ($file) {
                    $file = File::process($file);
                    $file->public = true;
                    $file->save();
                    return $file;
                })
                ->each(function ($file) use ($award) {
                    AwardMedia::create([
                        'award_id' => $award->id,
                        'file_id' => $file->id,
                    ]);
                });
        }
        $award->update($data);
        $award->load('medias');
        $award->setApproved($request->user()->hasRole(Role::ADMIN));
        return $award;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Award  $award
     * @return \Illuminate\Http\Response
     */
    public function destroy(Award $award)
    {
        $award->delete();

        return response('', 204);
    }
}
