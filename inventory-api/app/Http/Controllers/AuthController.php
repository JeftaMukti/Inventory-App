<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function index(){
        $user = User::all();

        return $user;
    }

    public function store(Request $request){
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
            'role' => 'required|in:admin,purchase,distribusi'
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'role' => $fields['role'],
        ]);

        return [
            'user' => $user,
        ];
    }

    public function update(Request $request, User $user){
        $fields = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:users,email,' . $user->id,
            'password' => 'required',
            'role' => 'required|in:admin,purchase,distribusi'
        ]);

        $user->update([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => isset($fields['password']) ? Hash::make($fields['password']) : $user->password,
            'role' => $fields['role'],
        ]);

        return [
            'user' => $user,
        ];
    }


    public function delete(Request $request, User $user){

        $user->delete();

        return [
            'message' => 'data has been delete',
        ];
    }


    public function login(Request $request){
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);


        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => "Your Email Or Password Maybe Wrong"
            ];
        }

        $token = $user->createToken($user->name);

        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return [
            'message' => 'you are logout'
        ];
    }
}
