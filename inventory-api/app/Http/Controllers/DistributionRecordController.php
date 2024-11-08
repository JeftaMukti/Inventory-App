<?php

namespace App\Http\Controllers;

use App\Models\DistributionRecord;
use App\Http\Requests\StoreDistributionRecordRequest;
use App\Http\Requests\UpdateDistributionRecordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DistributionRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $distribution = DistributionRecord::join('products', 'products.id', '=', 'distribution_records.product_id')
        ->join('stations', 'stations.id', '=', 'distribution_records.station_id')
        ->join('users', 'users.id', '=', 'distribution_records.user_id')
        ->select('distribution_records.id', 'users.name AS penanggung_jawab', 'products.name AS product_name',
        'distribution_records.product_qty', 'stations.name AS station_name', 'distribution_records.distribution_date')
        ->get();

        return response()->json([
            'code' => 200,
            'message' => 'success',
            'data' => $distribution
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'product_id' => 'required|exists:products,id',
            'station_id' => 'required|exists:stations,id',
            'product_qty' => 'required|min:1',
            'distribution_date' => 'required|date'
        ]);

        $userId = Auth::id();

        $productId = $fields['product_id'];
        $stationId = $fields['station_id'];
        $productQty = $fields['product_qty'];
        $date = $fields['distribution_date'];

        DB::beginTransaction();
        try {
            $distributionId = DB::table('distribution_records')->insert([
                'user_id' => $userId,
                'product_id' => $productId,
                'station_id' => $stationId,
                'product_qty' => $productQty,
                'distribution_date' => $date,
            ]);

            DB::table('products')
            ->where('id', $productId)
            ->decrement('stock_qty',$productQty);

            $distributionRecord = DB::table('distribution_records')
            ->where('id', $distributionId)
            ->first();

            DB::commit();
            return response()->json([
                'response' => 200,
                'message' => 'success',
                'data' => $distributionRecord // Return the purchase record details
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
    public function show(DistributionRecord $distributionRecord,$id)
    {
        $distribution = DistributionRecord::join('products', 'products.id', '=', 'distribution_records.product_id')
        ->join('stations', 'stations.id', '=', 'distribution_records.station_id')
        ->join('users', 'users.id', '=', 'distribution_records.user_id')
        ->select('distribution_records.id', 'users.name AS penanggung_jawab', 'products.name AS product_name',
        'distribution_records.product_qty', 'stations.name AS station_name','stations.location AS station_address', 'stations.manager AS station_manager', 'distribution_records.distribution_date')
        ->where('distribution_records.id',$id)
        ->get();

        return response()->json([
            'code' => 200,
            'message' => 'data hass been showed',
            'data' => $distribution
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDistributionRecordRequest $request, DistributionRecord $distributionRecord)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DistributionRecord $distributionRecord, $id)
    {
        DB::transaction(function () use ($id) {
            $distribution = DB::table('distribution_records')
            ->where('id', $id)
            ->first();

            if ($distribution) {
                DB::table('products')
                ->where('id', $distribution->product_id)
                ->increment('stock_qty', $distribution->product_qty);

                DB::table('distribution_records')
                ->where('id', $id)
                ->delete();
            }
        });

        return [
            'message' => 'data hass been deleted',
        ];
    }
}
