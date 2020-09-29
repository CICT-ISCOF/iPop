<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Record;
use App\Models\User;
use App\Models\Birth;
use App\Models\Death;
use App\Models\CPDB;
use App\Models\Marriage;
use App\Models\InMigration;
use App\Models\OutMigration;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function users(Request $request)
    {
        $query = $request->input('query');
        Log::record('User searched for users. Query: ' . $query);
        return User::search($query);
    }

    public function records(Request $request)
    {
        $query = $request->input('query');
        $type = $request->input('type');
        $types = [
            'Birth' => Birth::class,
            'Death' => Death::class,
            'CPDB' => CPDB::class,
            'InMigration' => InMigration::class,
            'OutMigration' => OutMigration::class,
            'Marriage' => Marriage::class,
        ];

        if (!in_array($type, array_keys($types))) {
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

        Log::record('User searched for records. Query: ' . $query);

        $paginate = $request->input('paginate') === 'true';

        $data = $model::search($query);
        $data = $paginate ? $data->paginate(10) : $data->get();
        if ($data->isEmpty()) {
            return response([]);
        }
        $data
            ->load('record.user.profilePicture')
            ->load('comments.user.profilePicture');

        return $data;
    }

    public function status(Request $request)
    {
        $query = $request->input('query');

        Log::record('User searched for records. Query: ' . $query);

        $data = Record::search($query);

        $paginate = $request->input('paginate') === 'true';
        $data = $paginate ? $data->paginate(10) : $data->get();
        if ($data->isEmpty()) {
            return response(
                [
                    'errors' => [
                        'query' => ['No results found.'],
                    ],
                ],
                404
            );
        }
        $data
            ->load('recordable.comments.user.profilePicture')
            ->load('user.profilePicture');
        return $data;
    }
}
