<?php

namespace App\Http\Controllers;

use App\Models\Birth;
use App\Models\Death;
use App\Models\CPDB;
use App\Models\Marriage;
use App\Models\InMigration;
use App\Models\OutMigration;
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
            'months' => $this->months(),
            'distributions' => $this->distributions(),
        ];
    }

    public function records()
    {
        $data = [
            'municipalities' => [],
            'barangays' => [],
        ];

        $models = [
            Birth::class,
            Death::class,
            CPDB::class,
            InMigration::class,
            OutMigration::class,
            Marriage::class,
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
            Birth::class,
            Death::class,
            CPDB::class,
            InMigration::class,
            OutMigration::class,
            Marriage::class,
        ];

        foreach ($models as $model) {
            $municipalities = $model
                ::selectRaw('municipality, COUNT(municipality) as total')
                ->groupBy('municipality')
                ->get();
            foreach ($municipalities as $record) {
                if (
                    !isset($population['municipalities'][$record->municipality])
                ) {
                    $population['municipalities'][
                        $record->municipality
                    ] = $model
                        ::where('municipality', $record->municipality)
                        ->count();
                }
            }

            $barangays = $model
                ::selectRaw('barangay, municipality, COUNT(barangay) as total')
                ->groupBy('barangay')
                ->get();

            foreach ($barangays as $record) {
                if (!isset($population['barangays'][$record->barangay])) {
                    $population['barangays'][$record->barangay] = $model
                        ::where('municipality', $record->municipality)
                        ->where('barangay', $record->barangay)
                        ->count();
                }
            }

            $population['total'] += $model::count();
        }

        $topMunicipalities = array_reverse(
            Arr::sort($population['municipalities'])
        );

        $top = [];

        $count = 0;
        foreach ($topMunicipalities as $name => $data) {
            if ($count == 5) {
                break;
            }

            $top[$name] = [
                'total' => $data,
                'barangays' => [],
            ];

            foreach ($models as $model) {
                $barangays = $model
                    ::selectRaw(
                        'barangay, municipality, COUNT(barangay) as total'
                    )
                    ->where('municipality', 'LIKE', '%' . $name . '%')
                    ->groupBy('barangay')
                    ->get();

                foreach ($barangays as $record) {
                    if (!isset($top[$name]['barangays'][$record->barangay])) {
                        $top[$name]['barangays'][$record->barangay] = $model
                            ::where('municipality', $record->municipality)
                            ->where('barangay', $record->barangay)
                            ->count();
                    }
                }
            }
            $count++;
        }

        $final = [];

        foreach ($top as $name => $data) {
            $data['name'] = $name;
            $array = [];
            foreach ($data['barangays'] as $name => $total) {
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
            Birth::class,
            Death::class,
            CPDB::class,
            InMigration::class,
            OutMigration::class,
            Marriage::class,
        ];

        $data = [
            'total_population' => 0,
            'total_barangays' => 0,
            'barangays' => [],
        ];

        foreach ($models as $model) {
            $data['total_population'] += $model
                ::where('municipality', 'LIKE', '%' . $name . '%')
                ->count();

            $data['total_barangays'] += $model
                ::where('municipality', 'LIKE', '%' . $name . '%')
                ->groupBy('barangay')
                ->count();

            $records = $model
                ::selectRaw('barangay, COUNT(*) as total')
                ->where('municipality', 'LIKE', '%' . $name . '%')
                ->groupBy('barangay')
                ->get();

            foreach ($records as $record) {
                if (!isset($data['barangays'][$record->barangay])) {
                    $data['barangays'][$record->barangay] = 0;
                }
                $data['barangays'][$record->barangay] += $record->total;
            }
        }

        $data['barangays'] = array_reverse(Arr::sort($data['barangays']));

        $final = [];

        foreach ($data['barangays'] as $name => $metadata) {
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
                'male' => Birth::where('sex', 'Male')->count(),
                'female' => Birth::where('sex', 'Female')->count(),
            ],
            'death' => [
                'male' => Death::where('sex', 'Male')->count(),
                'female' => Death::where('sex', 'Female')->count(),
            ],
            'cpdb' => [
                'male' => CPDB::where('sex', 'Male')->count(),
                'female' => CPDB::where('sex', 'Female')->count(),
            ],
            'inmigration' => [
                'male' => InMigration::where('sex', 'Male')->count(),
                'female' => InMigration::where('sex', 'Female')->count(),
            ],
            'outmigration' => [
                'male' => OutMigration::where('sex', 'Male')->count(),
                'female' => OutMigration::where('sex', 'Female')->count(),
            ],
            'marriage' => [
                'male' => Marriage::where('sex', 'Male')->count(),
                'female' => Marriage::where('sex', 'Female')->count(),
            ],
        ];
    }

    public function months()
    {
        $data = [];

        $months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        $models = [
            Birth::class => 'birth',
            Death::class => 'death',
            InMigration::class => 'inmigration',
            OutMigration::class => 'outmigration',
            Marriage::class => 'marriage',
        ];

        foreach ($models as $model => $name) {
            foreach ($months as $month) {
                if (!isset($data[$name][$month])) {
                    $data[$name][$month] = 0;
                }

                $data[$name][$month] += $model::where('month', $month)->count();
            }
        }

        foreach ($models as $name) {
            $total = 0;
            foreach ($data[$name] as $month) {
                $total += $month;
            }
            $data[$name]['total'] = $total;
        }

        return $data;
    }

    public function distributions()
    {
        $models = [
            Death::class => 'death',
            CPDB::class => 'cpdb',
            InMigration::class => 'inmigration',
            OutMigration::class => 'outmigration',
            Marriage::class => 'marriage',
        ];

        $data = [
            ['Age', 'Male', 'Female'],
            ['Below 1 year old', 0, 0],
            ['0-4', 0, 0],
            ['5-9', 0, 0],
            ['10-14', 0, 0],
            ['15-19', 0, 0],
            ['20-24', 0, 0],
            ['25-29', 0, 0],
            ['30-34', 0, 0],
            ['35-39', 0, 0],
            ['40-44', 0, 0],
            ['45-49', 0, 0],
            ['50-54', 0, 0],
            ['55-59', 0, 0],
            ['60-64', 0, 0],
            ['64-69', 0, 0],
            ['70-74', 0, 0],
            ['75-79', 0, 0],
            ['80 and above', 0, 0],
        ];

        $age_brackets_male = [];
        $age_brackets_female = [];

        foreach ($models as $model => $name) {
            $records = $model
                ::selectRaw('age_bracket, COUNT(age_bracket) as total')
                ->groupBy('age_bracket')
                ->where('sex', 'Male')
                ->get();
            foreach ($records as $record) {
                if (!isset($age_brackets_male[$record->age_bracket])) {
                    $age_brackets_male[$record->age_bracket] = 0;
                }
                $age_brackets_male[$record->age_bracket] += $record->total;
            }
            $records = $model
                ::selectRaw('age_bracket, COUNT(age_bracket) as total')
                ->groupBy('age_bracket')
                ->where('sex', 'Female')
                ->get();
            foreach ($records as $record) {
                if (!isset($age_brackets_female[$record->age_bracket])) {
                    $age_brackets_female[$record->age_bracket] = 0;
                }
                $age_brackets_female[$record->age_bracket] -= $record->total;
            }
        }

        $records = Birth::selectRaw(
            'age_bracket_of_mother, COUNT(age_bracket_of_mother) as total'
        )
            ->groupBy('age_bracket_of_mother')
            ->get();
        foreach ($records as $record) {
            if (!isset($age_brackets[$record->age_bracket])) {
                $age_brackets_female[$record->age_bracket_of_mother] = 0;
            }
            $age_brackets_female[$record->age_bracket_of_mother] +=
                $record->total;
        }

        foreach ($age_brackets_male as $category => $count) {
            foreach ($data as $index => $array) {
                if ($array[0] === $category) {
                    $data[$index][1] += $count;
                }
            }
        }

        foreach ($age_brackets_female as $category => $count) {
            foreach ($data as $index => $array) {
                if ($array[0] === $category) {
                    $data[$index][2] -= $count;
                }
            }
        }

        return $data;
    }

    public function filter(Request $request)
    {
        $models = [
            Birth::class => 'birth',
            Death::class => 'death',
            InMigration::class => 'inmigration',
            OutMigration::class => 'outmigration',
            CPDB::class => 'cpdb',
        ];

        $data = [
            'genders' => [],
        ];

        $data['married'] = $this->_applyFilters(
            $request,
            new Marriage()
        )->count();
        $data['district'] = null;
        $data['population'] = 0;
        $data['households'] = 0;
        $data['barangays'] = 0;
        $data['zones'] = 0;
        $tops = [
            'barangays' => [],
            'zones' => [],
        ];

        foreach ($models as $model => $name) {
            $data['genders'][$name] = [
                'male' => $this->_applyFilters(
                    $request,
                    $model::where('sex', 'Male')
                )->count(),
                'female' => $this->_applyFilters(
                    $request,
                    $model::where('sex', 'Female')
                )->count(),
            ];
            $sample = $this->_applyFilters($request, new $model())->first();
            if ($sample && !$data['district']) {
                $data['district'] = $sample->district;
            }
            $data['population'] += $this->_applyFilters(
                $request,
                new $model()
            )->count();

            $data['households'] += $this->_applyFilters(
                $request,
                $model::selectRaw('household_number, COUNT(household_number) as total')->groupBy('household_number')
            )->get()->count();

            $barangays = $this->_applyFilters(
                $request,
                $model::selectRaw('barangay, COUNT(barangay) as total')->groupBy('barangay')
            )->get();

            $data['barangays'] += $barangays->count();
            
            foreach ($barangays as $record) {
                if (!isset($tops['barangays'][$record->barangay])) {
                    $tops['barangays'][$record->barangay] = 0;
                }
                $tops['barangays'][$record->barangay] += $record->total;
            }
        }

        $data['zones'] += $this->_applyFilters(
            $request,
            CPDB::selectRaw('*')->groupBy('zone')
        )->count();

        foreach (
            $this->_applyFilters(
                $request,
                Marriage::selectRaw(
                    'barangay, COUNT(barangay) as total'
                )->groupBy('barangay')
            )->get()
            as $record
        ) {
            if (!isset($tops['barangays'][$record->barangay])) {
                $tops['barangays'][$record->barangay] = 0;
            }
            $tops['barangays'][$record->barangay] += $record->total;
        }

        foreach (
            $this->_applyFilters(
                $request,
                CPDB::selectRaw('zone, COUNT(zone) as total')->groupBy(
                    'zone'
                )
            )->get()
            as $record
        ) {
            if(!isset($tops['zones'][$record->zone])) {
                $tops['zones'][$record->zone] = 0;
            }
            $tops['zones'][$record->zone] += $record->total;
        }

        $final = [];
        $count = 0;
        foreach(array_reverse(Arr::sort($tops['barangays'])) as $barangay => $count) {
            if($count < 5) {
                break;
            }
            $final[] = [
                'name' => $barangay,
                'total' => $count,
            ];
            $count++;
        }

        $tops['barangays'] = $final;

        $final = [];
        $count = 0;
        foreach(array_reverse(Arr::sort($tops['zones'])) as $zone => $count) {
            if($count < 5) {
                break;
            }
            $final[] = [
                'name' => $zone,
                'total' => $count
            ];
            $count++;
        }
        
        $tops['zones'] = $final;
        
        $data['tops'] = $tops;

        return $data;
    }

    /**
     * Apply filters to a model.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Database\Eloquent\Model $model
     *
     * @return \Illuminate\Database\Eloquent\Model $model
     */
    protected function _applyFilters(Request $request, $model)
    {
        $municipality = $request->input('municipality');
        $barangay = $request->input('barangay');
        $year = $request->input('year');
        $month = $request->input('month');

        if ($municipality) {
            $model->where('municipality', 'LIKE', '%' . $municipality . '%');
        }

        if ($barangay) {
            $model->where('barangay', 'LIKE', '%' . $barangay . '%');
        }

        if ($year) {
            $model->where('created_at', 'LIKE', '%' . $year . '%');
        }

        if ($month) {
            $model->where('month', 'LIKE', '%' . $month . '%');
        }

        return $model;
    }
}
