<?php

namespace App\Http\Controllers;

use App\Models\PurchaseRecord;
use App\Http\Requests\StorePurchaseRecordsRequest;
use App\Http\Requests\UpdatePurchaseRecordsRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PurchaseRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = PurchaseRecord::join('products', 'products.id', '=' , 'purchase_records.product_id')
        ->join('suppliers', 'suppliers.id', '=', 'purchase_records.supplier_id')
        ->join('users', 'users.id', '=', 'purchase_records.user_id')
        ->select('purchase_records.id AS purchase_id','users.name AS User', 'products.name AS productName', 'suppliers.name As SupplierName',
        'purchase_records.product_qty', 'purchase_records.purchase_date')
        ->get();

        return response()->json([
            'response' => 200,
            'success' => true,
            'message' => 'purchase Records has been show',
            'data' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_qty' => 'required|integer|min:1',
            'purchase_date' => 'required|date',
        ]);

        $productId = $fields['product_id'];
        $purchaseQty = $fields['product_qty'];
        $purchaseDate = $fields['purchase_date'];

        $userId = Auth::id();

        $supplierId = DB::table('products')->where('id', $productId)->value('supplier_id'); // Get the supplier ID from the products table

        DB::beginTransaction();
        try {
            $purchaseId = DB::table('purchase_records')->insertGetId([
                'user_id' => $userId,
                'product_id' => $productId,
                'supplier_id' => $supplierId,
                'product_qty' => $purchaseQty,
                'purchase_date' => $purchaseDate,
            ]);

            // Update the stock quantity in the products table
            DB::table('products')
                ->where('id', $productId)
                ->increment('stock_qty', $purchaseQty);

            // Fetch the inserted purchase record
            $purchaseRecord = DB::table('purchase_records')
                ->where('id', $purchaseId)
                ->first();

            DB::commit();

            // Return a JSON response with purchase details
            return response()->json([
                'response' => 200,
                'message' => 'success',
                'data' => $purchaseRecord // Return the purchase record details
            ], 200);
        } catch (\Throwable $th) {
            DB::rollBack();

            return response()->json([
                'response' => 500,
                'message' => 'purchase failed',
                'error' => $th->getMessage() // Return the error message for debugging
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $show = PurchaseRecord::join('products', 'products.id', '=' , 'purchase_records.product_id')
        ->join('suppliers', 'suppliers.id', '=', 'purchase_records.supplier_id')
        ->join('users', 'users.id', '=', 'purchase_records.user_id')
        ->select('purchase_records.id AS purchase_id','users.name AS User', 'products.name AS productName', 'suppliers.name As SupplierName',
        'purchase_records.product_qty', 'purchase_records.purchase_date', 'suppliers.email As SupplierEmail', 'suppliers.phone As SupplierPhone', 'suppliers.address As SupplierLocation', 'suppliers.contact_person As SupplierContactPerson')
        ->where('purchase_records.id',$id)
        ->get();
        return [
            'response' => 200,
            'message' => 'data hass been showed',
            'data' => $show
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePurchaseRecordsRequest $request,)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PurchaseRecord $purchaseRecords, $id)
    {
        DB::transaction(function () use ($id) {
            $purchase = DB::table('purchase_records')
            ->where('id', $id)
            ->first();

            if ($purchase) {
                DB::table('products')
                ->where('id', $purchase->product_id)
                ->decrement('stock_qty', $purchase->product_qty);

                DB::table('purchase_records')
                ->where('id', $id)
                ->delete();
            }
        });

        return [
            'code' => 200,
            'message' => 'purchase Records Has Been Deleted'
        ];
    }
}
