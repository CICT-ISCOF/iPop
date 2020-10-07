<?php

namespace App\Http\Requests\CMS;

use Illuminate\Foundation\Http\FormRequest;

class CMSRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'sub_categories' => ['nullable', 'json'],

            'articles' => ['nullable', 'array'],
            'articles.*.title' => ['required', 'string', 'max:255'],
            'articles.*.description' => ['required', 'string', 'max:255'],
            'articles.*.file' => ['required', 'base64'],

            'cards' => ['nullable', 'array'],
            'cards.*.title' => ['required', 'string', 'max:255'],
            'cards.*.description' => ['required', 'string', 'max:255'],
            'cards.*.file' => ['required', 'base64'],

            'grids' => ['nullable', 'array'],
            'grids.*.title' => ['required', 'string', 'max:255'],
            'grids.*.file' => ['required', 'base64'],

            'lists' => ['nullable', 'array'],
            'lists.*.body' => ['required', 'string'],

            'medias' => ['nullable', 'array'],
            'medias.*.file' => ['required', 'base64'],

            'sliders' => ['nullable', 'array'],
            'sliders.*.file' => ['required', 'base64'],

            'texts' => ['nullable', 'array'],
            'texts.*.title' => ['required', 'string', 'max:255'],
            'texts.*.body' => ['required', 'string'],
        ];
    }
}
