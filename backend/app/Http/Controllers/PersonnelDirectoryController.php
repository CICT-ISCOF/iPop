<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\PersonnelDirectory;
use App\Models\Role;
use Database\Factories\ApprovalFactory;
use Illuminate\Http\Request;

class PersonnelDirectoryController extends Controller
{
    public function index()
    {
        return [
            'ppo' => PersonnelDirectory::where('type','PROVINCIAL POPULATION OFFICE')->get(),
            'ad' => PersonnelDirectory::where('type','ADMINISTRATIVE DIVISION')->get(),
            'trd' => PersonnelDirectory::where('type','TRAINING AND RESEARCH DIVISION')->get(),
            'fod1' => PersonnelDirectory::where('type','FIELD OPERATIONS DIVISION District I')->get(),
            'fod2' => PersonnelDirectory::where('type','FIELD OPERATIONS DIVISION District II')->get(),
            'fod3' => PersonnelDirectory::where('type','FIELD OPERATIONS DIVISION District III')->get(),
            'fod4' => PersonnelDirectory::where('type','FIELD OPERATIONS DIVISION District IV')->get(),
            'fod5' => PersonnelDirectory::where('type','FIELD OPERATIONS DIVISION District V')->get(),
            'apvw' => PersonnelDirectory::where('type','Association of Population Volunteer Workers-Iloilo, Inc')->get(),
            'bod' => PersonnelDirectory::where('type','Board of Directors')->get(),
            'bspo1' => PersonnelDirectory::where('type','BARANGAY SERVICE POINT OFFICERS (BSPOs) District I')->get(),
            'bspo2' => PersonnelDirectory::where('type','BARANGAY SERVICE POINT OFFICERS (BSPOs) District II')->get(),
            'bspo3' => PersonnelDirectory::where('type','BARANGAY SERVICE POINT OFFICERS (BSPOs) District III')->get(),
            'bspo4' => PersonnelDirectory::where('type','BARANGAY SERVICE POINT OFFICERS (BSPOs) District IV')->get(),
            'bspo5' => PersonnelDirectory::where('type','BARANGAY SERVICE POINT OFFICERS (BSPOs) District V')->get(),
        ];
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'email' => ['email:rfc,dns'],
        ]);
        $quickLink = PersonnelDirectory::create($data);
        $quickLink->approval()->save(new ApprovalFactory([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a personnel in the personnel directory.')
        ]));
        $quickLink->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User added a personnel in the personnel directory.");
        return $quickLink;
    }

    public function destroy(PersonnelDirectory $personnelDirectory)
    {
        $personnelDirectory->makeDeleteRequest();
        Log::record("User removed a personnel in the personnel directory.");
        return response('', 204);
    }
}
