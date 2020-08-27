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
        Log::record('User searched for records. Query: ' . $query);
        $type = $request->input('type');
        $types = ['Birth', 'Death', 'CPDB', 'InMigration', 'OutMigration'];
        $errors = [];
        if(!in_array($type, $types))
        {
            $errors['query'] = ['Invalid record type. Valid types are '.implode(', ', $types)];
        }
        $type = "App\\{$type}";
        $model = new $type();
        $columns = $model->getFillable();
        $column = $request->input('column');
        if(!in_array($column, $columns))
        {
            $errors['column'] = ['Invalid column. Valid columns are '.implode(', ', $columns)];
        }

        if(!empty($errors))
        {
            return response([
                'errors' => $errors
            ], 400);
        }

        return $model::with('record.user.profilePicture')
            ->with('comments.user.profilePicture')
            ->where($column, $query)
            ->paginate(10);
    }
}
