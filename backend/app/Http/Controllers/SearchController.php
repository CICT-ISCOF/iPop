<?php

namespace App\Http\Controllers;

use App\Models\Log;
use App\Models\Record;
use App\Models\User;
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
            Birth::class,
            Death::class,
            CPDB::class,
            InMigration::class,
            OutMigration::class,
            Marriage::class,
        ];

        if (!in_array($type, $types)) {
            return response(
                [
                    'errors' => [
                        'type' => [
                            'Invalid record type. Valid types are ' .
                                implode(', ', $types),
                        ],
                    ],
                ],
                400
            );
        }

        $model = "App\\{$type}";

        Log::record('User searched for records. Query: ' . $query);

        $paginate = $request->input('paginate') === 'true';

        $data = $model::search($query);
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
