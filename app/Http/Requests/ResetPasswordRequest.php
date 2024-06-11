<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email', 'exists:users'],
            'token' => ['required', 'min:60'],
            'password' => ['required', 'string', 'min:6']
        ];
    }

    // override the failedValidation function 
    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'errors' => $validator->errors()
        ], 422);

        throw new ValidationException($validator, $response);
    }
}
