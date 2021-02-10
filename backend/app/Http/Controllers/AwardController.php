<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\CMS\Award;
use App\Models\CMS\AwardMedia;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;

class AwardController extends Controller
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
                ->each(function ($file) use ($award, $request) {
                    $media = AwardMedia::create([
                        'award_id' => $award->id,
                        'file_id' => $file->id,
                    ]);
                    $media->approval()->save(new Approval([
                        'requester_id' => $request->user()->id,
                        'message' => $request->user()->makeMessage('wants to add an award media.'),
                    ]));
                    $media->setApproved($request->user()->hasRole(Role::ADMIN));
                });
        }
        $award->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add an award.')
        ]));
        $award->setApproved($request->user()->hasRole(Role::ADMIN));

        $award->load('medias');
        Log::record("User created an award.");
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
        return Award::findApproved($award->id)->first()
            ?: response('', 404);
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
                $media->makeDeleteRequest();
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
                ->each(function ($file) use ($award, $request) {
                    $media = AwardMedia::create([
                        'award_id' => $award->id,
                        'file_id' => $file->id,
                    ]);
                    $media->approval()->save(new Approval([
                        'requester_id' => $request->user()->id,
                        'message' => $request->user()->makeMessage('wants to add an award media to an existing award.'),
                    ]));
                });
        }
        $award->update($data);
        $award->load('medias');
        $award->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a media.'));
        Log::record("User updated an award.");
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
        $award->makeDeleteRequest();
        Log::record("User deleted an award.");
        return response('', 204);
    }

    public function deleteAwardMedia(Request $request, AwardMedia $media)
    {
        $media->makeDeleteRequest();
        return response('', 204);
    }
}
