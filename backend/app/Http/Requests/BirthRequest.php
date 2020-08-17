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

    public function messages()
    {
        return [
            'sorting_number.required' => 'Please provide a Sorting Number',
            'sorting_number.string' => 'Sorting Number must be a string.',
            'sorting_number.max:255' =>
                'Sorting Number must not exceed 255 characters.',
            'municipality.required' => 'Please provide a Municipality',
            'municipality.string' => 'Municipality must be a string.',
            'municipality.max:255' =>
                'Municipality must not exceed 255 characters.',
            'barangay.required' => 'Please provide a Barangay',
            'barangay.string' => 'Barangay must be a string.',
            'barangay.max:255' => 'Barangay must not exceed 255 characters.',
            'household_number.required' => 'Please provide a Household Number',
            'household_number.string' => 'Household Number must be a string.',
            'household_number.max:255' =>
                'Household Number must not exceed 255 characters.',
            'number_of_cases.required' => 'Please provide the number of cases.',
            'number_of_cases.numeric' =>
                'Number of cases must be a numeric value.',
            'total_cases.required' => 'Please provide the total cases.',
            'total_cases.numeric' => 'Total cases must be a numberic value.',
            'month.required' => 'Please provide a month.',
            'month.in' =>
                'The month provided must be one of the following: January, February, March, April, May, June, July, August, September, October, November or December.',
            'name.required' => 'Please provide a Name',
            'name.string' => 'Name must be a string.',
            'name.max:255' => 'Name must not exceed 255 characters.',
        ];
    }
}
