<?php

namespace App\Http\Controllers;

use App\Mail\VerifayEmail;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // Register method
    public function register(Request $request): JsonResponse
    {
        try {
            // Validate user data
            $validated = $request->validate([
                'name' => ['string', 'required', 'max:255'],
                'email' => ['email', 'required', 'string', 'unique:users'],
                'password' => ['required', 'string', 'min:6']
            ]);

            // Hash the password
            $validated['password'] = Hash::make($validated['password']);

            // Create new user
            $verfiyToken = Str::random(60);
            $validated['verification_token'] = $verfiyToken;

            $user = User::create($validated);

            // Create token for user
            $token = $user->createToken('userToken')->plainTextToken;

            // send email for verfication 
            Mail::to($user->email)->send(new VerifayEmail($verfiyToken, $user->email));
            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'userToken' => $token
            ], 201);
        } catch (ValidationException $e) {
            // If validation fails, return a 400 Bad Request status code
            return response()->json(['errors' => $e->errors()], 400);
        } catch (\Exception $e) {

            // If there's a server error, return a 500 Internal Server Error status code
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    // Login method
    public function login(Request $request)
    {
        try {
            // Validate user data
            $validated = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required', 'string']
            ]);

            // Check if credentials are correct and user is authenticated
            if (Auth::attempt($validated)) {
                $token = auth()->user()->createToken('userToken')->plainTextToken;
                return response()->json(['userToken' => $token], 200);
            } else {
                // If user is not authenticated, throw an error
                throw ValidationException::withMessages(['email' => 'Invalid credentials']);
            }
        } catch (ValidationException $e) {
            // If validation fails, return a 401 Unauthorized status code
            return response()->json(['errors' => $e->errors()], 401);
        } catch (\Exception $e) {

            // If there's a server error, return a 500 Internal Server Error status code
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
