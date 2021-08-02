<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Log;
use App\Models\PersonnelDirectory;
use App\Models\Role;
use Illuminate\Http\Request;

class PersonnelDirectoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index');
    }

    public function index()
    {
        $data = PersonnelDirectory::getApproved()->get();
        $ppo = [];
        $ad = [];
        $trd = [];
        $fod1 = [];
        $fod2 = [];
        $fod3 = [];
        $fod4 = [];
        $fod5 = [];
        $apvw = [];
        $bod = [];
        $bspo1 = [];
        $bspo2 = [];
        $bspo3 = [];
        $bspo4 = [];
        $bspo5 = [];

        foreach ($data as $personnel) {
            if ($personnel->type === 'PROVINCIAL POPULATION OFFICE') {
                array_push($ppo, $personnel);
            }
            if ($personnel->type === 'ADMINISTRATIVE DIVISION') {
                array_push($ad, $personnel);
            }
            if ($personnel->type === 'TRAINING AND RESEARCH DIVISION') {
                array_push($trd, $personnel);
            }
            if ($personnel->type === 'FIELD OPERATIONS DIVISION District I') {
                array_push($fod1, $personnel);
            }
            if ($personnel->type === 'FIELD OPERATIONS DIVISION District II') {
                array_push($fod2, $personnel);
            }
            if ($personnel->type === 'FIELD OPERATIONS DIVISION District III') {
                array_push($fod3, $personnel);
            }
            if ($personnel->type === 'FIELD OPERATIONS DIVISION District IV') {
                array_push($fod4, $personnel);
            }
            if ($personnel->type === 'FIELD OPERATIONS DIVISION District V') {
                array_push($fod5, $personnel);
            }
            if ($personnel->type === 'Association of Population Volunteer Workers-Iloilo, Inc') {
                array_push($apvw, $personnel);
            }
            if ($personnel->type === 'Board of Directors') {
                array_push($bod, $personnel);
            }
            if ($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District I') {
                array_push($bspo1, $personnel);
            }
            if ($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District II') {
                array_push($bspo2, $personnel);
            }
            if ($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District III') {
                array_push($bspo3, $personnel);
            }
            if ($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District IV') {
                array_push($bspo4, $personnel);
            }
            if ($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District V') {
                array_push($bspo5, $personnel);
            }
        }

        return [
            'ppo' => $ppo, 'ad' => $ad, 'trd' => $trd,
            'fod1' => $fod1, 'fod2' => $fod2, 'fod3' => $fod3, 'fod4' => $fod4, 'fod5' => $fod5,
            'apvw' => $apvw, 'bod' => $bod,
            'bspo1' => $bspo1, 'bspo2' => $bspo2, 'bspo3' => $bspo3,
            'bspo4' => $bspo4, 'bspo5' => $bspo5,
        ];
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $request->validate([
            'type' => ['required', 'string', 'max:255'],
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
        ]);
        $quickLink = PersonnelDirectory::create($data);
        $quickLink->approval()->save(new Approval([
            'requester_id' => $request->user()->id,
            'message' => $request->user()->makeMessage('wants to add a personnel in the personnel directory.')
        ]));
        $quickLink->setApproved($request->user()->hasRole(Role::ADMIN));
        Log::record("User added a personnel in the personnel directory.");
        return $quickLink;
    }

    public function destroy($id)
    {
        $personnelDirectory = PersonnelDirectory::findOrFail($id);
        $personnelDirectory->makeDeleteRequest();
        Log::record("User removed a personnel in the personnel directory.");
        return response('', 204);
    }
}
