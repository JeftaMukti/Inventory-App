<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::join('suppliers', 'suppliers.id', '=', 'products.supplier_id')
            ->select('products.id', 'products.name', 'products.discription', 'products.supplier_id', 'suppliers.name AS supplier', 'products.stock_qty')
            ->get();

        return response()->json([
            'code' => 200,
            'message' => 'success',
            'data' => $products
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
            'stock_qty' => 'nullable|integer|min:0',
        ]);

        $fields['stock_qty'] = $fields['stock_qty'] ?? 0;

        $product = Product::create($fields);

        return response()->json([
            'code' => 200,
            'message' => 'Product has been created',
            'data' => $product
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json([
            'code' => 200,
            'message' => 'Product data has been shown',
            'data' => $product
        ]);
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
            'stock_qty' => 'nullable|integer|min:0',
        ]);

        $fields['stock_qty'] = $fields['stock_qty'] ?? 0;

        $product->update($fields);

        return response()->json([
            'code' => 200,
            'message' => 'Product has been updated',
            'data' => $product,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json([
            'code' => 200,
            'message' => 'Product has been deleted'
        ]);
    }
}
