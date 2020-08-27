<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class StatisticsController extends Controller
{
    public function index()
    {
        return [
            'records' => $this->records(),
            'totals' => $this->totals(),
            'population' => $this->population(),
        ];
    }

    public function records()
    {
        $data = [
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
        }
        return $data;
    }

    public function totals()
    {
        $data = $this->records();
        return [
            'municipalities' => count($data['municipalities']),
            'barangays' => count($data['barangays']),
            'population' => $this->population()['total'],
            'genders' => $this->genders(),
        ];
    }

    public function population()
    {
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
            }

            $population['total'] += $model::count();
        }

        $topMunicipalities = array_reverse(Arr::sort($population['municipalities']));

        $top = [];

        $count = 0;
        foreach($topMunicipalities as $name => $data)
        {
            if($count == 4)
            {
                break;
            }

            $top[$name] = [
                'total' => $data,
                'barangays' => [],
            ];

            foreach($models as $model)
            {
                $barangays = $model
                    ::selectRaw('barangay, municipality, COUNT(barangay) as total')
                    ->where('municipality', $name)
                    ->groupBy('barangay')
                    ->get();

                foreach ($barangays as $record) {
                    if(!isset($top[$name]['barangays'][$record->barangay]))
                    {
                        $top[$name]['barangays'][$record->barangay] =
                            $model::where('municipality', $record->municipality)
                                ->where('barangay', $record->barangay)
                                ->count();
                    }
                }
            }
            $count++;
        }

        $final = [];

        foreach($top as $name => $data)
        {
            $data['name'] = $name;
            $array = [];
            foreach($data['barangays'] as $name => $total)
            {
                $array[] = [
                    'name' => $name,
                    'total' => $total,
                ];
            }
            $data['barangays'] = array_reverse(Arr::sort($array));
            $final[] = $data;
        }
        $top = $final;

        $population['top'] = $top;

        return $population;
    }

    public function municipality(Request $request)
    {
        $name = $request->input('name');

        $models = [
            "App\\Birth",
            "App\\Death",
            "App\\CPDB",
            "App\\InMigration",
            "App\\OutMigration",
            "App\\Marriage",
        ];

        $data = [
            'total_population' => 0,
            'total_barangays' => 0,
            'barangays' => [],
        ];

        foreach($models as $model)
        {
            $data['total_population'] += $model::where('municipality', $name)
                ->count();
                
            $data['total_barangays'] += $model::selectRaw('barangay')
                ->where('municipality', $name)
                ->groupBy('barangay')
                ->count();

            $records = $model::selectRaw('barangay, COUNT(*) as total')
                ->where('municipality', $name)
                ->groupBy('barangay')
                ->get();

            foreach($records as $record)
            {
                if(!isset($data['barangays'][$record->barangay]))
                {
                    $data['barangays'][$record->barangay] = 0;
                }
                $data['barangays'][$record->barangay] += $record->total;
            }
        }

        $data['barangays'] = array_reverse(Arr::sort($data['barangays']));

        $final = [];

        foreach($data['barangays'] as $name => $metadata)
        {
            $final[] = [
                'name' => $name,
                'total' => $metadata,
            ];
        }

        $data['barangays'] = $final;

        return $data;
    }

    public function genders()
    {
        return [
            'birth' => [
                'male' => \App\Birth::where('sex', 'Male')->count(),
                'female' => \App\Birth::where('sex', 'Female')->count(),
            ],
            'death' => [
                'male' => \App\Death::where('sex', 'Male')->count(),
                'female' => \App\Death::where('sex', 'Female')->count(),
            ],
            'cpdb' => [
                'male' => \App\CPDB::where('sex', 'Male')->count(),
                'female' => \App\CPDB::where('sex', 'Female')->count(),
            ],
            'inmigration' => [
                'male' => \App\InMigration::where('sex', 'Male')->count(),
                'female' => \App\InMigration::where('sex', 'Female')->count(),
            ],
            'outmigration' => [
                'male' => \App\OutMigration::where('sex', 'Male')->count(),
                'female' => \App\OutMigration::where('sex', 'Female')->count(),
            ],
            'marriage' => [
                'male' => \App\Marriage::where('sex', 'Male')->count(),
                'female' => \App\Marriage::where('sex', 'Female')->count(),
            ],
        ];
    }

    public function marriages()
    {
        $data = [
            'January' => 0,
            'February' => 0,
            'March' => 0,
            'April' => 0,
            'May' => 0,
            'June' => 0,
            'July' => 0,
            'August' => 0,
            'September' => 0,
            'October' => 0,
            'November' => 0,
            'December' => 0,
        ];

        foreach(array_keys($data) as $month)
        {
            $data[$month] += \App\Marriage::where('month', $month)->count();
        }

        return $data;
    }
}