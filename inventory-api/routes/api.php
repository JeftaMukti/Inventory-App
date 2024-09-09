<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DistributionRecordController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseRecordController;
use App\Http\Controllers\StationController;
use App\Http\Controllers\SupplierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Admin Role Route
Route::middleware(['auth:sanctum', 'role:admin'])->group(function (){
    Route::post('/create-account', [AuthController::class, 'store']);
    Route::get('/account', [AuthController::class, 'index']);
    Route::put('/update-account/{user}', [AuthController::class, 'update']);
    Route::delete('/delete-account/{user}', [AuthController::class, 'delete']);
});
//End Admin Role Route


//Authentication Route
Route::post('/login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class,'logout'])->middleware('auth:sanctum');;
//End Authentication Route

//Two Role Can Access
Route::middleware(['auth:sanctum'])->group(function (){
    Route::get('/product',[ProductController::class,'index']);
    Route::get('/product/{product}',[ProductController::class,'show']);
});
//End Two Role Can Access

//Role:Purchase Route
Route::middleware(['auth:sanctum','role:purchase'])->group(function (){
    Route::apiResource('/supplier', SupplierController::class);
    Route::apiResource('/purchase', PurchaseRecordController::class);
    //product Role Purchase
    Route::post('/product-create',[ProductController::class,'store']);
    Route::put('/product-update/{product}',[ProductController::class,'update']);
    Route::delete('/product-delete/{product}',[ProductController::class,'destroy']);
    //End Purchase

});
//End Role:Purchase Route

//Role:Distribusi Route
Route::middleware(['auth:sanctum','role:distribusi'])->group(function (){
    Route::apiResource('/station', StationController::class);
    Route::apiResource('/distribution', DistributionRecordController::class);
});
//End Role:Distribusi Route
