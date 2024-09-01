<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Authentication Route
Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class,'logout'])->middleware('auth:sanctum');;
//End Authentication Route

//Role:Purchase Route
Route::middleware(['auth:sanctum','role:purchase'])->group(function (){
    Route::get('/purchase', function(){
        return response()->json([
            'message' => 'halo role purchase'
        ]);
    });
});
//End Role:Purchase Route

//Role:Distribusi Route
Route::middleware(['auth:sanctum','role:distribusi'])->group(function (){
    Route::get('/distribusi', function(){
        return response()->json([
            'message' => 'halo role distribusi'
        ]);
    });
});
//End Role:Distribusi Route
