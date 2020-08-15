<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
            'username' => 'nullable|string|unique:App\User|max:255',
            'fullname' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'municipality' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'password' => 'nullable|string|max:255',
            'question' => 'nullable|max:255',
            'answer' => 'nullable|max:255',
            'pin' => 'nullable|unique:App\User|max:255',
            'blocked' => 'nullable|boolean',
            'role' => [
                'nullable',
                'string',
                Rule::in(['Super Admin', 'PPO', 'PPO1', 'BSPO']),
            ],
            'profile_picture' => 'nullable|file',
        ];
    }
}
