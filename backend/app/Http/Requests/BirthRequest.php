<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BirthRequest extends FormRequest
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
            'number_of_cases' => ['required', 'numeric'],
            'household_number' => ['required', 'string', 'max:255'],
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
            'birth_order' => [
                'required',
                Rule::in([
                    'First Born',
                    'Second Born',
                    'Third Born',
                    'Fourth Born',
                    'Fifth and up',
                ]),
            ],
            'place_of_birth' => ['required', 'string', 'max:255'],
            'name_of_mother' => ['required', 'string', 'max:255'],
            'age_of_mother' => ['required', 'numeric', 'max:255'],
            'age_bracket_of_mother' => [
                'required',
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
            'occupation_of_mother' => ['required', 'string', 'max:255'],
            'religion' => ['required', 'string', 'max:255'],
            'mother_marital_status' => ['required', 'string', 'max:255'],
            'registered_lcr' => ['required', 'boolean'],
        ];
    }
}
