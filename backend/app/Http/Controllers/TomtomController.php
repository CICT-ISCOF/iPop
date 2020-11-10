<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TomtomController extends Controller
{
    protected $key;
    protected $url;

    public function __construct()
    {
        $this->key = env('TOMTOM_KEY');
        $this->url = env('TOMTOM_URL');
    }

    public function search(Request $request)
    {
        $query = urlencode($request->input('query'));

        $url = "{$this->url}/{$query}.json";

        $response = Http::withHeaders([
            'Accept' => 'application/json'
        ])->get($url, [
            'countrySet' => 'PH',
            'key' => $this->key,
        ]);

        if (!$response->successful()) {
            return [];
        }

        return $response->json()['results'];
    }
}
