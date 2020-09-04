<?php

namespace App\Http\Controllers;

use App\Log;
use App\User;
use App\Birth;
use App\Death;
use App\CPDB;
use App\InMigration;
use App\OutMigration;
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
            'Birth',
            'Death',
            'CPDB',
            'InMigration',
            'OutMigration',
            'Marriage',
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

        return $paginate ? $data->paginate(10) : $data->get();
    }
}
