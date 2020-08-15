<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class OutMigrationUpdateRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:255'],
            'sex' => ['nullable', Rule::in(['Male', 'Female'])],
            'date_of_birth' => ['nullable', 'date'],
            'age' => ['nullable', 'numeric', 'max:255'],
            'age_in_months' => ['nullable', 'string', 'max:255'],
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
            'completed_educational_attainment' => [
                'nullable',
                'string',
                'max:255',
            ],
            'actual_occupation' => ['nullable', 'string', 'max:255'],
            'major_occupation' => ['nullable', 'string', 'max:255'],
            'monthly_income' => ['nullable', 'string', 'max:255'],
            'skills_acquired' => ['nullable', 'string'],
            'actual_place_of_origin' => ['nullable', 'string', 'max:255'],
            'place_of_origin' => ['nullable', 'string', 'max:255'],
            'reasons_for_out_migrating' => ['nullable', 'string', 'max:255'],
        ];
    }
}
