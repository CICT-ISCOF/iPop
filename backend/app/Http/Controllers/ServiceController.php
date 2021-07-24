<?php

namespace App\Http\Controllers;

use App\Models\CMS\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
    }

    public function index()
    {
        return Service::getApproved()
            ->with('offers', function ($builder) {
                return $builder->whereHas('approval', function ($builder) {
                    return $builder->where('approved', true);
                });
            })
            ->get();
    }

    public function store(Request $request)
    {
        return response('', 404);
    }

    public function show(Service $service)
    {
        return Service::findApproved($service->id)
            ->with('offers', function ($builder) {
                return $builder->whereHas('approval', function ($builder) {
                    return $builder->where('approved', true);
                });
            })->first()
            ?: response('', 404);
    }

    public function update(Request $request, Service $service)
    {
        return response('', 404);
    }

    public function destroy(Service $service)
    {
        return response('', 404);
    }
}
