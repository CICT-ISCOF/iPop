<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TextRequest extends FormRequest
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
            'link_id' => ['required', 'exists:App\Link,id'],
            'h1' => ['nullable', 'string'],
            'h4' => ['nullable', 'string'],
            'p' => ['nullable', 'string'],
            'position' => ['required', 'numeric'],
        ];
    }
}
