<?php

namespace App\Http\Controllers;

use App\Models\DeleteRequest;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DeleteRequestController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'role:' . Role::ADMIN]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return DeleteRequest::paginate(20);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return response('', 403);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DeleteRequest  $deleteRequest
     * @return \Illuminate\Http\Response
     */
    public function show(DeleteRequest $deleteRequest)
    {
        return $deleteRequest;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DeleteRequest  $deleteRequest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DeleteRequest $deleteRequest)
    {
        $deleteRequest->update($request->validate([
            'approved' => ['required', 'boolean'],
            'pending' => ['required', 'boolean'],
        ]));

        return $deleteRequest;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DeleteRequest  $deleteRequest
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteRequest $deleteRequest)
    {
        $deleteRequest->delete();

        return response('', 204);
    }
}
