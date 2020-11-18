<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\CMS\Service;
use App\Models\CMS\ServiceOffer;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ServiceOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ServiceOffer::getApproved()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'service_id' => ['required', Rule::exists('services', 'id')],
            'title' => ['required', 'string', 'max:255'],
        ]);

        $offer = new ServiceOffer($data);

        $service = Service::find($data['service_id']);
        $service->offers()->save($offer);
        $offer->approval()->save(new Approval(['requester_id' => $request->user()->id]));
        $offer->setApproved($request->user()->hasRole(Role::ADMIN));

        return $offer;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ServiceOffer  $serviceOffer
     * @return \Illuminate\Http\Response
     */
    public function show(ServiceOffer $serviceOffer)
    {
        return ServiceOffer::findApproved($serviceOffer->id)->first() || response('', 404);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ServiceOffer  $serviceOffer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ServiceOffer $serviceOffer)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
        ]);

        $serviceOffer->update($data);
        $serviceOffer->setApproved($request->user()->hasRole(Role::ADMIN));

        return $serviceOffer;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ServiceOffer  $serviceOffer
     * @return \Illuminate\Http\Response
     */
    public function destroy(ServiceOffer $serviceOffer)
    {
        $serviceOffer->delete();

        return response('', 204);
    }
}
