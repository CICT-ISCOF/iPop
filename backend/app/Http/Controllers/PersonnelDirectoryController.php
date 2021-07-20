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
        $data = PersonnelDirectory::all();
        $ppo = []; $ad = [];  $trd = [];
        $fod1 = []; $fod2 = [];$fod3 = []; $fod4 = []; $fod5 = [];
        $apvw = []; $bod = [];
        $bspo1 = []; $bspo2 = []; $bspo3 = []; $bspo4 = []; $bspo5 = []; 
    
        foreach($data as $personnel){
            if($personnel->type === 'PROVINCIAL POPULATION OFFICE'){
                array_push($ppo, $personnel->type );
            }
            if($personnel->type === 'ADMINISTRATIVE DIVISION'){
                array_push($ad, $personnel->type );
            }
            if($personnel->type === 'TRAINING AND RESEARCH DIVISION'){
                array_push($trd, $personnel->type );
            }
            if($personnel->type === 'FIELD OPERATIONS DIVISION District I'){
                array_push($fod1, $personnel->type );
            }
            if($personnel->type === 'FIELD OPERATIONS DIVISION District II'){
                array_push($fod2, $personnel->type );
            }
            if($personnel->type === 'FIELD OPERATIONS DIVISION District III'){
                array_push($fod3, $personnel->type );
            }
            if($personnel->type === 'FIELD OPERATIONS DIVISION District IV'){
                array_push($fod4, $personnel->type );
            }
            if($personnel->type === 'FIELD OPERATIONS DIVISION District V'){
                array_push($fod5, $personnel->type );
            }
            if($personnel->type === 'Association of Population Volunteer Workers-Iloilo, Inc'){
            array_push($apvw, $personnel->type );
            }
            if($personnel->type === 'Board of Directors'){
                array_push($bod, $personnel->type );
            }
            if($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District I'){
                array_push($bspo1, $personnel->type );
            }
             if($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District II'){
                array_push($bspo2, $personnel->type );
            }
             if($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District III'){
                array_push($bspo3, $personnel->type );
            }
             if($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District IV'){
                array_push($bspo4, $personnel->type );
            }
             if($personnel->type === 'BARANGAY SERVICE POINT OFFICERS (BSPOs) District V'){
                array_push($bspo5, $personnel->type );
            }
        }
        
        return [
            'ppo' => $ppo,'ad' => $ad,'trd' => $trd,
            'fod1' => $fod1,'fod2' => $fod2,'fod3' => $fod3,'fod4' => $fod4,'fod5' => $fod5,
            'apvw' => $apvw,'bod' => $bod,
            'bspo1' => $bspo1,'bspo2' => $bspo2,'bspo3' => $bspo3,
            'bspo4' => $bspo4,'bspo5' => $bspo5,
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
