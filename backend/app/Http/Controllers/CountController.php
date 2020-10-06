<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Birth;
use App\Models\Death;
use App\Models\CPDB;
use App\Models\Marriage;
use App\Models\InMigration;
use App\Models\OutMigration;
use App\Models\Record;

class CountController extends Controller
{
    public function countByType(Request $request)
    {
        $type = $request->input('type');
        $types = [
            'Birth' => Birth::class,
            'Death' => Death::class,
            'CPDB' => CPDB::class,
            'InMigration' => InMigration::class,
            'OutMigration' => OutMigration::class,
            'Marriage' => Marriage::class,
        ];

        if(!in_array($type, array_keys($types)))
        {
            return response(
                [
                    'errors' => [
                        'type' => [
                            'Invalid record type. Valid types are ' .
                                implode(', ', array_keys($types)),
                        ],
                    ],
                ],
                400
            );
        }

        $model = $types[$type];
        return $model::with(['record' => function($query) {
            $query->where('status', 'Pending');
        }])->get()->count();
    }

    public function count()
    {
        return Record::where('status', 'Pending')->count();
    }
}
