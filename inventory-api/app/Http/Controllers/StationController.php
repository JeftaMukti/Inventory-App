<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Http\Requests\StorestationRequest;
use App\Http\Requests\UpdatestationRequest;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorestationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(station $station)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatestationRequest $request, station $station)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(station $station)
    {
        //
    }
}
