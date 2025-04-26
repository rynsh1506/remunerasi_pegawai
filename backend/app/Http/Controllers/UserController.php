<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::paginate(10);
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ]);

        $newUser = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        // Generate token untuk user baru
        $token = JWTAuth::fromUser($newUser);

        return response()->json([
            'token' => $token,
            'user'  => $newUser,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $targetUser = User::findOrFail($id);
        return response()->json($targetUser);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($user->id !== $id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8',
        ]);

        $targetUser = User::findOrFail($id);

        // Update hanya field yang ada di request
        if ($request->has('name')) {
            $targetUser->name = $request->name;
        }
        if ($request->has('email')) {
            $targetUser->email = $request->email;
        }
        if ($request->has('password')) {
            $targetUser->password = Hash::make($request->password);
        }

        $targetUser->save();

        return response()->json($targetUser);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        if ($user->id !== $id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $targetUser = User::findOrFail($id);
        $targetUser->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
