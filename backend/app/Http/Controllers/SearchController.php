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
        if(!in_array($type, $types))
        {
            return response([
                'errors' => [
                    'query' => ['Invalid record type. Valid types are '.implode(', ', $types)]
                ]
            ]);
        }
        $type = "App\\{$type}";
        $model = new $type();
        $model = $model::with('record.user')->with('comments.user');
        $count = 0;
        foreach((new $type)->getFillable() as $key)
        {
            if($count === 0)
            {
                $model = $model->where($key, 'LIKE', "%{$query}%");
            }
            else
            {
                $model = $model->orWhere($key, 'LIKE', "%{$query}%");
            }
            $count++;
        }
        return $model->paginate(10);
    }
}
