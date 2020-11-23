<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\CMS\Activity;
use App\Models\CMS\ActivityFile;
use App\Models\CMS\ProgramArea;
use App\Models\File;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ActivityController extends Controller
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
        return Activity::getApproved()->get();
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
            'program_area_id' => ['required', Rule::exists('program_areas', 'id')],
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'isFile'],
        ]);

        $activity = new Activity($data);

        $programArea = ProgramArea::find($data['program_area_id']);
        $programArea->activities()->save($activity);
        $activity->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $activity->setApproved($request->user()->hasRole(Role::ADMIN));

        if (isset($data['files'])) {
            collect($data['files'])
                ->map(function ($file) {
                    $file = File::process($file);
                    $file->public = true;
                    $file->save();
                    return $file;
                })
                ->each(function ($file) use ($activity) {
                    $activity->files()->save(new ActivityFile([
                        'file_id' => $file->id,
                    ]));
                });
        }

        $activity->load('files');

        return $activity;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CMS\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return Activity::findApproved($activity->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CMS\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        $data = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['required', 'isFile'],
            'truncate_media' => ['nullable', 'boolean']
        ]);

        if (isset($data['truncate_media']) && $data['truncate_media']) {
            $activity->files->each(function ($file) {
                $file->delete();
            });
        }

        $activity->update($data);
        if (isset($data['files'])) {
            collect($data['files'])
                ->map(function ($file) {
                    $file = File::process($file);
                    $file->public = true;
                    $file->save();
                    return $file;
                })
                ->each(function ($file) use ($activity) {
                    $activity->files()->save(new ActivityFile([
                        'file_id' => $file->id,
                    ]));
                });
        }
        $activity->setApproved($request->user()->hasRole(Role::ADMIN));

        return $activity;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CMS\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        $activity->delete();

        return response('', 204);
    }
}
