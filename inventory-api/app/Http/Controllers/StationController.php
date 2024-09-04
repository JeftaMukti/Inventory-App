<?php

namespace App\Http\Controllers;

use App\Models\Station;
use App\Http\Requests\StorestationRequest;
use App\Http\Requests\UpdatestationRequest;
use Illuminate\Http\Request;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Station::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'location' => 'required',
            'manager' => 'required',
        ]);

        $station = Station::create($fields);

        return $station;
    }

    /**
     * Display the specified resource.
     */
    public function show(station $station)
    {
        return $station;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, station $station)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'location' => 'required',
            'manager' => 'required',
        ]);

        $station->update($fields);

        return $fields;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(station $station)
    {
        $station->delete();
        return [
            'message' => 'data has delete',
        ];
    }
}
