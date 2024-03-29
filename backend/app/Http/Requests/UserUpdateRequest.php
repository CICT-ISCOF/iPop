<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Hash;

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
            'username' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('users')->ignoreModel($this->user()),
            ],
            'fullname' => 'nullable|string|max:255',
            'district' => 'nullable|string|max:255',
            'municipality' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'old_password' => 'nullable|string|max:255',
            'old_question' => 'nullable|string|max:255',
            'old_answer' => 'nullable|string|max:255',
            'old_pin' => 'nullable|string|max:255',
            'new_password' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(function () {
                    return request()->has('old_password');
                }),
            ],
            'new_question' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(function () {
                    return request()->has('old_question');
                }),
            ],
            'new_answer' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(function () {
                    return request()->has('old_answer') ||
                        request()->has('old_question');
                }),
            ],
            'new_pin' => [
                'nullable',
                'max:255',
                Rule::unique('users', 'pin')->ignoreModel($this->user()),
                Rule::requiredIf(function () {
                    return request()->has('old_pin');
                }),
            ],
            'blocked' => 'nullable|boolean',
            'role' => [
                'nullable',
                'string',
            ],
            'profile_picture' => [
                Rule::requiredIf(function () {
                    return request()->has('profile_picture') &&
                        (request()->input('profile_picture') instanceof
                            UploadedFile ||
                            is_string(request()->input('profile_picture')));
                }),
            ],
            'assigned_municipality' => ['nullable', 'string'],
            'assigned_barangay' => ['nullable', 'string'],
        ];
    }
}
