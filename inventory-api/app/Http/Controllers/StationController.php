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
        return response()->json(Station::all());
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

        return response()->json(['station' => $station], 201); // Return the station wrapped in an object
    }

    /**
     * Display the specified resource.
     */
    public function show(Station $station)
    {
        return response()->json($station);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Station $station)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'location' => 'required',
            'manager' => 'required',
        ]);

        $station->update($fields);

        return response()->json(['station' => $station]); // Return the updated station wrapped in an object
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Station $station)
    {
        $station->delete();
        return response()->json(['message' => 'Data has been deleted']);
    }
}
