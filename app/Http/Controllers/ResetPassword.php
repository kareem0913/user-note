<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPassword extends Controller
{
    public function reset(ResetPasswordRequest $request)
    {
        $passwordReset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where("token", $request->token)->first();

        if (!$passwordReset) {
            return response()->json(['error' => "Invalid token"], 401);
        }
        $user = User::where('email', $request->email)->first();
        $user->update(
            [
                'password' => Hash::make($request->password)
            ]
        );
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();
        return response()->json(['success' => 'Passwords updated successfully'], 200);
    }
}
