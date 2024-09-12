<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoresupplierRequest;
use App\Http\Requests\UpdatesupplierRequest;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Supplier::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'phone' => 'required',
            'website' => 'required|url',
            'address' => 'required|max:255',
            'contact_person' => 'required|max:255'
        ]);

        $supplier = Supplier::create($fields);

        return response()->json([
            'code' => 200,
            'message' => 'success',
            'data' => $supplier
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(supplier $supplier)
    {
        return $supplier;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request   $request, supplier $supplier)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email',
            'phone' => 'required|max:255',
            'website' => 'required|url',
            'address' => 'required|max:255',
            'contact_person' => 'required|max:255'
        ]);

        $supplier->update($fields);

        return response()->json([
            'code' => 200,
            'message' => 'success',
            'data' => $fields // or $fields for update
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(supplier $supplier)
    {
        $supplier->delete();
        return [
            'message' => 'Data Has Been Deleted'
        ];
    }
}
