<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarriageRequest extends FormRequest
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
            'sorting_number' => ['required', 'max:255'],
            'municipality' => ['required', 'max:255'],
            'barangay' => ['required', 'max:255'],
            'total_cases' => ['required', 'numeric'],
            'household_number' => ['required', 'max:255'],
            'case_number' => ['required', 'max:255'],
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
            'couple_name' => ['required', 'max:255'],
            'sex' => ['required', Rule::in(['Male', 'Female'])],
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
            'address' => ['required', 'max:255'],
            'wedding_ceremony_type' => ['required', 'max:255'],
            'residence_address' => ['required', 'max:255'],
            'solemnizing_officer' => ['required', 'max:255'],
            'registered_lcr' => ['required', 'max:255'],
        ];
    }
}
