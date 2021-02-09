<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use App\Models\Municipality;
use App\Models\Province;
use App\Models\Region;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function getMuncipalityCode(Request $request)
    {
        return Municipality::where('municipality_code', $request->input('municipality_code'))->first();
    }

    public function regions(Request $request)
    {
        $region = $request->input('region');
        if ($region) {
            return Region::where('code', $region)
                ->with('provinces')
                ->first();
        }
        return Region::with('provinces')->get();
    }

    public function provinces(Request $request)
    {
        $code = $request->input('region_code');
        $province = $request->input('province');
        if ($province) {
            return Province::where('code', $province)
                ->with('municipalities')
                ->first();
        }
        if (!$code) {
            return response(
                [
                    'errors' => [
                        'region_code' => ['Region Code is required.'],
                    ],
                ],
                400
            );
        }
        return Province::where('region_code', $code)
            ->with('municipalities')
            ->get();
    }

    public function municipalities(Request $request)
    {
        $code = $request->input('province_code');
        $municipality = $request->input('municipality');
        if ($municipality) {
            return Municipality::where('code', $municipality)
                ->with('barangays')
                ->first();
        }
        if (!$code) {
            return response(
                [
                    'errors' => [
                        'province_code' => ['Province Code is required.'],
                    ],
                ],
                400
            );
        }
        return Municipality::where('province_code', $code)
            ->with('barangays')
            ->get();
    }

    public function barangays(Request $request)
    {
        $code = $request->input('municipality_code');
        if (!$code) {
            return response(
                [
                    'errors' => [
                        'municipality_code' => [
                            'Municipality Code is required.',
                        ],
                    ],
                ],
                400
            );
        }
        return Barangay::where('municipality_code', $code)->get();
    }

    public function search(Request $request)
    {
        $errors = [
            'type' => [],
            'query' => [],
        ];
        $data = $request->only(['type', 'query']);
        if (!isset($data['type'])) {
            $errors['type'][] = 'Type is required.';
        } elseif (
            !in_array($data['type'], [
                'Region',
                'Province',
                'Municipality',
                'Barangay',
            ])
        ) {
            return $errors['type'][] =
                'Type must be either Region, Province, Municipality or Barangay.';
        }
        if (!isset($data['query'])) {
            $errors['query'][] = 'Query is required.';
        }
        if (!empty($errors['type']) || !empty($errors['query'])) {
            return response($errors, 400);
        }
        $model = "App\\" . $data['type'];
        $results = $model::search($data['query']);
        $data =
            $request->input('paginate') === 'true'
            ? $results->paginate(10)
            : $results->get();
        if ($request->input('type') === 'Barangay') {
            $data->load('municipality');
        }
        return $data;
    }
}
