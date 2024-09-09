<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::join('suppliers', 'suppliers.id', '=' , 'products.supplier_id')
        ->select('products.name', 'products.discription', 'products.supplier_id' , 'suppliers.name AS supplier', 'products.stock_qty')
        ->get();

        return response()->json([
            'code' => 200,
            'message' => 'success',
            'data' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'discription' => 'required',
            'supplier_id' => 'required|exists:suppliers,id',
            'stock_qty' => 'nullable',
        ]);

        $product = Product::create($fields);

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $fields = $request->validate([
            'name' => 'required|max:255',
            'discription' => 'required',
            'supplier_id' => 'required|exists:suppliers,id',
            'stock_qty' => 'required',
        ]);

        $product->update($fields);

        return response()->json([
            'code' => 200,
            'message' => 'product has been created',
            'product' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return [
            'message' => 'data product hass been deleted'
        ];
    }
}
