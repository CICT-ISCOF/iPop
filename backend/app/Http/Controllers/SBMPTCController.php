<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\File;
use App\Models\Log;
use App\Models\Role;
use App\Models\SBMPTC;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SBMPTCController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    public function index(Request $request)
    {
        $data = $request->all();
        return SBMPTC::getApproved()->where('district',$data['district'])->get();
    }
    
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'tc_coordinator_count' => ['nullable', 'numeric'],
            'population' => ['nullable', 'numeric'],
            'services' => ['nullable', 'string'],
            'municipality' => ['required', Rule::exists('municipalities', 'name')],
            'district' => ['required', 'string', 'max:255'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['required', 'isFile'],
        ]);

        $sbmptc = SBMPTC::create($data);
        $sbmptc->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a SBMPTC.')
        ]));
        $sbmptc->setApproved($request->user()->hasRole(Role::ADMIN));

        if (isset($data['photos'])) {
            collect($data['photos'])->each(function ($binary) use ($sbmptc) {
                $file = File::process($binary);
                $file->public = true;
                $file->save();
                $sbmptc->photos()->create([
                    'photo_id' => $file->id,
                ]);
            });
        }

        Log::record("Created a SBMPTC.");

        return $sbmptc;
    }

    public function show($id)
    {
        return SBMPTC::findApproved($id)
            ->with('members')
            ->with('photos')
            ->first()
            ?: response('', 404);
    }

    public function update(Request $request, $id)
    {
        $sbmptc = SBMPTC::findOrFail($id);
        $data = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'tc_coordinator_count' => ['nullable', 'numeric'],
            'population' => ['nullable', 'numeric'],
            'services' => ['nullable', 'string'],
            'municipality' => ['nullable', Rule::exists('municipalities', 'name')],
            'district' => ['nullable', 'string', 'max:255'],
            'photos' => ['nullable', 'array'],
            'photos.*' => ['required', 'isFile'],
        ]);

        $sbmptc->update($data);
        $sbmptc->setApproved($request->user()->hasRole(Role::ADMIN))
            ->setApprovalMessage($request->user()->makeMessage('wants to update a SBMPTC.'));

        if (isset($data['photos'])) {
            $sbmptc->photos->each(function ($photo) {
                $photo->delete();
            });
            collect($data['photos'])->each(function ($binary) use ($sbmptc) {
                $file = File::process($binary);
                $file->public = true;
                $file->save();
                $sbmptc->photos()->create([
                    'photo_id' => $file->id,
                ]);
            });
        }

        Log::record("Updated a SBMPTC.");

        return $sbmptc;
    }

    public function destroy($id)
    {
        $sbmptc = SBMPTC::findOrFail($id);
        $sbmptc->makeDeleteRequest();

        Log::record("Deleted a SBMPTC.");

        return response('', 204);
    }
}
