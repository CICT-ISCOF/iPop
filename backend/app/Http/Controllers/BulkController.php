<?php

namespace App\Http\Controllers;

use App\Models\Birth;
use App\Models\Death;
use App\Models\CPDB;
use App\Models\Marriage;
use App\Models\InMigration;
use App\Models\OutMigration;
use App\Models\Record;
use App\Models\Log;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BulkController extends Controller
{
    public function insert(Request $request)
    {
        $type = $request->input('type');
        $data = $request->input('data');
        $models = [
            'birth' => Birth::class,
            'death' => Death::class,
            'cpdb' => CPDB::class,
            'marriage' => Marriage::class,
            'inmigration' => InMigration::class,
            'outmigration' => OutMigration::class,
        ];

        if (!in_array($type, array_keys($models))) {
            return response(
                [
                    'errors' => [
                        'type' =>
                            'Valid types are ' .
                            implode(', ', array_keys($models)),
                    ],
                ],
                422
            );
        }
        if (!is_array($data)) {
            return response(
                [
                    'errors' => [
                        'data' => 'Data must be an array.',
                    ],
                ],
                422
            );
        }
        $model = $models[$type];
        foreach ($data as $row) {
            $model
                ::create($row)
                ->record()
                ->save(
                    new Record([
                        'user_id' => $request->user()->id,
                        'status' => 'Imported',
                    ])
                );
        }
        Log::record('User imported bulk data of type: ' . $type);
        return response('', 201);
    }
}
