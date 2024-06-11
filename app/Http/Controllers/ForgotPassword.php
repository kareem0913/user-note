<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Mail\ResetPasswordEmail;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class ForgotPassword extends Controller
{

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        $token = Str::random(60);
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => $token,
                'created_at' => now()
            ]
        );
        Mail::to($email)->send(new ResetPasswordEmail($token, $email));

        return response()->json(['s' => $user], 200);
    }
}
