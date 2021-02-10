<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\CMS\Activity;
use App\Models\CMS\ActivityFile;
use App\Models\CMS\ProgramArea;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ActivityController extends Controller
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

        $programArea = ProgramArea::find($data['program_area_id']);
        $activity = $programArea->activities()->create($data);
        $activity->approval()->create([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a program area activity.'),
        ]);
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

        Log::record("User created a new activity for {$programArea->title}");

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
        return Activity::findApproved($activity->id)->first()
            ?: response('', 404);
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
        $activity->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a program area activity.'));

        $activity->update($data);

        Log::record("User updated an activity.");

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
        $activity->makeDeleteRequest();

        Log::record("Deleted an activity.");

        return response('', 204);
    }

    public function deleteActivityFile(ActivityFile $file)
    {
        $file->delete();

        return response('', 204);
    }
}
