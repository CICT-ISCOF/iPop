<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            // 'email' => 'required|string|unique:App\User|max:255|email',
            'username' => 'required|string|unique:App\User|max:255',
            'fullname' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'question' => 'nullable|max:255',
            'answer' => 'nullable|max:255',
            'pin' => 'nullable|unique:App\User|max:255',
            'role' => [
                'required',
                'string',
                Rule::in(['Super Admin', 'PPO', 'PPO1', 'BSPO']),
            ],
        ];
    }
}
