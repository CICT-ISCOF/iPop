<?php

namespace App\Http\Controllers;

use App\Barangay;
use App\Municipality;
use App\Province;
use App\Region;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function regions()
    {
        return Region::with('provinces')->get();
    }

    public function provinces(Request $request)
    {
        $code = $request->input('region_code');
        if (!$code) {
            return response(
                [
                    'errors' => [
                        'region_code' => ['Region Code is required.'],
                    ],
                ],
                422
            );
        }
        return Province::where('region_code', $code)
            ->with('municipalities')
            ->get();
    }

    public function municipalities(Request $request)
    {
        $code = $request->input('province_code');
        if (!$code) {
            return response(
                [
                    'errors' => [
                        'province_code' => ['Province Code is required.'],
                    ],
                ],
                422
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
                422
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
