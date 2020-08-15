<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarriageUpdateRequest extends FormRequest
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
            'household_number' => ['nullable', 'string', 'max:255'],
            'case_number' => ['nullable', 'string', 'max:255'],
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
            'couple_name' => ['nullable', 'string', 'max:255'],
            'sex' => ['nullable', Rule::in(['Male', 'Female'])],
            'age_bracket' => [
                'nullable',
                Rule::in([
                    'Below 1 year old',
                    '01-04',
                    '05-09',
                    '10-14',
                    '15-19',
                    '20-24',
                    '25-29',
                    '30-34',
                    '35-39',
                    '40-44',
                    '45-49',
                    '50-54',
                    '55-59',
                    '60-64',
                    '65-69',
                    '70-74',
                    '75-79',
                    '80 and above',
                ]),
            ],
            'address' => ['nullable', 'string', 'max:255'],
            'wedding_ceremony_type' => [
                'nullable',
                Rule::in(['Church', 'Civil', 'Tribal Rites']),
            ],
            'residence_address' => ['nullable', 'string', 'max:255'],
            'solemnizing_officer' => [
                'nullable',
                Rule::in(['Judge', 'Mayor', 'Priest/Pastor/Imam']),
            ],
            'registered_lcr' => ['nullable', 'boolean'],
        ];
    }
}
