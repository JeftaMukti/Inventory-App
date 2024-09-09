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

        return $product;
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

        $userId = Auth::id();//get user ID XD

        $supplierId = DB::table('products')->where('id',$productId)->value('supplier_id');//get supplier Id dari table products XD

        DB::beginTransaction();
        try {
            DB::table('purchase_records')->insert([
                'user_id' => $userId,
                'product_id' => $productId,
                'supplier_id' => $supplierId,
                'product_qty' => $purchaseQty,
                'purchase_date' => $purchaseDate,
            ]);

            //Update QTY dari dari qty product
            DB::table('products')
            ->where('id', $productId)
            ->increment('stock_qty', $purchaseQty);

            DB::commit();
            return response()->json(['message' => 'purchase Successfully', "respones" => 200]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['error' => 'purchase gagal', 500]);
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
        'purchase_records.product_qty', 'purchase_records.purchase_date')
        ->where('purchase_records.id',$id)
        ->get();
        return [
            200,
            'message' => 'data hass been showed',
            'purchase_record' => $show
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
        $delete = DB::table('purchase_records')->where('purchase_records.id', $id)
        ->delete();

        return [
            'message' => 'purchase Records Has Been Deleted'
        ];
    }
}
