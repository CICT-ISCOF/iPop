<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CommentRequest extends FormRequest
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
            'body' => ['required', 'string'],
            'type' => ['required', 'string', Rule::in([
                'Approval',
                'Birth',
                'Death',
                'CPDB',
                'InMigration',
                'OutMigration',
                'Marriage',
            ])],
            'commentable_id' => ['required', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'body.required' => 'Body is required.',
            'body.string' => 'Body must be text.',
            'type.required' => 'Specify the record\'s type.',
            'type.string' => 'Specify the record\'s type.',
            'type.in' => 'Invalid type. Valid types are Approval, Birth, Death, CPDB, InMigration, OutMigration and Marriage.',
            'commentable_id.required' => 'The (Birth, Death, CPDB, InMigration, OutMigration or Marriage)\'s ID must be provided.',
            'commentable_id.numberic' => 'ID provided must be a numeric value.'
        ];
    }
}
