<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function getUser(Request $request): JsonResponse
    {
        return response()->json(['user' => $request->user()]);
    }

    public function update(Request $request)
    {
        try {
            $user = $request->user();
            $validated = $request->validate([
                'name' => ['string', 'max:255'],
                'email' => ['email', 'string', 'unique:users,email,' . $user->id],
                'password' => ['nullable', 'string', 'min:6']
            ]);

            // Update user details
            if (!empty($validated['password'])) {
                $validated['password'] = Hash::make($validated['password']);
            } else {
                unset($validated['password']);
            }

            $user->update($validated);

            return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
        } catch (ValidationException $e) {
            // If validation fails, return a 400 Bad Request status code
            return response()->json(['errors' => $e->errors()], 400);
        } catch (\Exception $e) {
            // If there's a server error, return a 500 Internal Server Error status code
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }
}
