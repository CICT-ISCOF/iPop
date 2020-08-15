<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BirthUpdateRequest extends FormRequest
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
            'sorting_number' => ['nullable', 'string', 'max:255'],
            'municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'total_cases' => ['nullable', 'numeric'],
            'number_of_cases' => ['nullable', 'numeric'],
            'household_number' => ['nullable', 'string', 'max:255'],
            'month' => [
                'nullable',
                Rule::in([
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ]),
            ],
            'name' => ['nullable', 'string', 'max:255'],
            'sex' => ['nullable', Rule::in(['Male', 'Female'])],
            'birth_order' => [
                'nullable',
                Rule::in([
                    'First Born',
                    'Second Born',
                    'Third Born',
                    'Fourth Born',
                    'Fifth and up',
                ]),
            ],
            'place_of_birth' => ['nullable', 'string', 'max:255'],
            'name_of_mother' => ['nullable', 'string', 'max:255'],
            'age_of_mother' => ['nullable', 'numeric', 'max:255'],
            'age_bracket_of_mother' => [
                'nullable',
                Rule::in([
                    '10-14',
                    '15-19',
                    '20-24',
                    '25-29',
                    '30-34',
                    '35-39',
                    '40-44',
                    '45-49',
                    '50-54',
                ]),
            ],
            'occupation_of_mother' => ['nullable', 'string', 'max:255'],
            'religion' => ['nullable', 'string', 'max:255'],
            'mother_marital_status' => ['nullable', 'string', 'max:255'],
            'registered_lcr' => ['nullable', 'boolean'],
        ];
    }
}
