<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class StatisticsController extends Controller
{
    public function index()
    {
        $data = [
            'municipalities' => [],
            'barangays' => [],
        ];

        $population = [
            'total' => 0,
            'municipalities' => [],
            'barangays' => [],
        ];

        $models = [
            "App\\Birth",
            "App\\Death",
            "App\\CPDB",
            "App\\InMigration",
            "App\\OutMigration",
            "App\\Marriage",
        ];

        foreach ($models as $model) {
            $municipalities = $model
                ::selectRaw('municipality, COUNT(municipality) as total')
                ->groupBy('municipality')
                ->get();
            foreach ($municipalities as $record) {
                if(!isset($population['municipalities'][$record->municipality]))
                {
                    $population['municipalities'][$record->municipality] =
                        $model::where('municipality', $record->municipality)
                            ->count();
                } 
                if (!isset($data['municipalities'][$record->municipality])) {
                    $data['municipalities'][$record->municipality] = [
                        'records' => $record->total,
                        'barangays' => [],
                    ];
                } else {
                    $data['municipalities'][$record->municipality]['records'] +=
                        $record->total;
                }
            }

            $barangays = $model
                ::selectRaw('barangay, municipality, COUNT(barangay) as total')
                ->groupBy('barangay')
                ->get();

            foreach ($barangays as $record) {
                if(!isset($population['barangays'][$record->barangay]))
                {
                    $population['barangays'][$record->barangay] =
                        $model::where('municipality', $record->municipality)
                            ->where('barangay', $record->barangay)
                            ->count();
                }

                if (!isset($data['barangays'][$record->barangay])) {
                    $data['barangays'][$record->barangay] = [];
                }

                $data['barangays'][$record->barangay]['municipality'] =
                    $record->municipality;
                if (!isset($data['barangays'][$record->barangay]['records'])) {
                    $data['barangays'][$record->barangay]['records'] =
                        $record->total;
                } else {
                    $data['barangays'][$record->barangay]['records'] +=
                        $record->total;
                }

                if (
                    !Arr::exists(
                        $data['municipalities'][$record->municipality][
                            'barangays'
                        ],
                        $record->barangay
                    )
                ) {
                    $data['municipalities'][$record->municipality][
                        'barangays'
                    ][] = $record->barangay;
                }
            }

            $population['total'] += $model::count();
        }

        // $data = $this->_transform($data);

        return [
            'records' => $data,
            'totals' => [
                'municipalities' => count($data['municipalities']),
                'barangays' => count($data['barangays']),
                'population' => $population
            ],
        ];
    }

    private function _transform($data)
    {
        $final = [];
        foreach ($data['municipalities'] as $name => $metadata) {
            $data['municipalities'][$name]['name'] = $name;
            $data['municipalities'][$name]['total_barangays'] = count(
                $data['municipalities'][$name]['barangays']
            );
            $final[] = $data['municipalities'][$name];
        }
        $data['municipalities'] = $final;

        $final = [];
        foreach ($data['barangays'] as $name => $metadata) {
            $final[] = [
                'name' => $name,
                'total' => $metadata['records'],
                'municipality' => $metadata['municipality'],
            ];
        }

        $data['barangays'] = $final;
        return $data;
    }
}
