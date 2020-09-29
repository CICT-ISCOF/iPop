<?php

namespace App\Http\Controllers;

use App\Birth;
use App\Death;
use App\CPDB;
use App\Marriage;
use App\InMigration;
use App\OutMigration;
use App\Record;
use App\Log;
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

        $this->_iterateSave($data, $model);
        
        Log::record('User imported bulk data of type: ' . $type);
        return response('', 201);
        
    }

    private function _iterateSave($data, $model) {
        if(is_iterable($data)) {
            if($this->_isAssociativeArray($data)) {
                $model
                ::create($data)
                ->record()
                ->save(new Record([
                    'user_id' => request()->user()->id,
                    'status' => 'Imported',
                ]));
            }
            else {
                foreach($data as $row) {
                    $this->_iterateSave($row, $model);
                }
            }
        }
    }

    private function _isAssociativeArray($array) {
        return count(array_filter(array_keys($array), 'is_string')) > 0;
    }
}