<?php

namespace App\Http\Requests;

use App\Models\Role;
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
            'username' => [
                'required',
                'string',
                'max:255',
                'unique:App\Models\User',
            ],
            'fullname' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'municipality' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'password' => 'required|string|max:255',
            'question' => 'nullable|string|max:255',
            'answer' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(function () {
                    return request()->has('question');
                }),
            ],
            'pin' => [
                'nullable',
                'string',
                'max:255',
                'unique:App\Models\User',
            ],
            'role' => [
                'required',
                'string',
                Rule::in(Role::DEFAULTS)
            ],
            'profile_picture' => 'nullable',
            'assigned_municipality' => ['nullable', 'string'],
            'assigned_barangay' => ['nullable', 'string'],
        ];
    }
}
