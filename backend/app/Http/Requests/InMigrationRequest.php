<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class InMigrationRequest extends FormRequest
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
            'sorting_number' => ['required', 'string', 'max:255'],
            'municipality' => ['required', 'string', 'max:255'],
            'barangay' => ['required', 'string', 'max:255'],
            'total_cases' => ['required', 'numeric'],
            'case_number' => ['required', 'string', 'max:255'],
            'month' => [
                'required',
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
            'name' => ['required', 'string', 'max:255'],
            'sex' => ['required', Rule::in(['Male', 'Female'])],
            'date_of_birth' => ['required', 'date'],
            'age' => ['required', 'numeric', 'max:255'],
            'age_in_months' => ['required', 'string', 'max:255'],
            'age_bracket' => [
                'required',
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
                'required',
                'string',
                'max:255',
            ],
            'actual_occupation' => ['required', 'string', 'max:255'],
            'major_occupation' => ['required', 'string', 'max:255'],
            'monthly_income' => ['required', 'string', 'max:255'],
            'skills_acquired' => ['required', 'string'],
            'actual_place_of_origin' => ['required', 'string', 'max:255'],
            'place_of_origin' => ['required', 'string', 'max:255'],
            'reasons_for_in_migrating' => ['required', 'string', 'max:255'],
        ];
    }
}
