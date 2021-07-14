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
use App\Models\BulkImportRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BulkController extends Controller
{
    protected $_rows = array();

    public function requests(Request $request)
    {
        $builder = BulkImportRequest::with('user');
        if ($request->has('municipality')) {
            $builder = $builder->whereHas('user', function ($builder) use ($request) {
                return $builder->where('municipality', $request->get('municipality'));
            });
        }
        return $builder->get();
    }

    public function insert(Request $request)
    {
        set_time_limit(0);
        $type = $request->input('type');
        $data = $request->input('data');

        $models = [
            'birth' => Birth::class,
            'death' => Death::class,
            'cpdb' => CPDB::class,
            'marriage' => Marriage::class,
            'inmigration' => InMigration::class,
            'outmigration' => OutMigration::class,
            'Birth' => Birth::class,
            'Death' => Death::class,
            'CPDB' => CPDB::class,
            'Marriage' => Marriage::class,
            'InMigration' => InMigration::class,
            'OutMigration' => OutMigration::class,
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

        foreach ($data as $sheet) {
            $this->_iterateSave($sheet);
        }

        /**
         * @var User
         */
        $user = $request->user();

        if ($user->hasRole(Role::ADMIN)) {
            foreach ($this->_rows as $row) {
                /**
                 * @var Birth
                 */
                $instance = $model::create($row);

                $instance->record()
                    ->save(new Record(array(
                        'user_id' => $user->id,
                        'status' => 'Imported'
                    )));
            }
        } else {
            $path = sprintf('%s - %s.bulk', date('Y-m-d'), $user->username);
            Storage::put($path, json_encode(['data' => $this->_rows, 'model' => $model]));
            BulkImportRequest::create([
                'path' => $path,
                'user_id' => $user->id,
                'approved' => false,
            ]);
        }

        Log::record('User imported bulk data of type: ' . $type);
        return response('', 204);
    }

    public function approve(BulkImportRequest $bulkImportRequest)
    {
        $bulkImportRequest->approve();
        return response('', 204);
    }

    private function _iterateSave($rows)
    {
        foreach ($rows as $row) {
            if ($this->_isAssocArray($row)) {
                $this->_rows[] = $row;
            } else {
                $this->_iterateSave($row);
            }
        }
    }

    private function _isAssocArray($data)
    {
        return count(array_filter(array_keys($data), 'is_string')) > 0;
    }
}
