<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'firstName.required' => 'Le prénom est requis.',
            'lastName.required' => 'Le nom est requis.',
            'email.required' => 'L\'email est requis.',
            'email.email' => 'L\'email doit être une adresse email valide.',
            'subject.required' => 'Le sujet est requis.',
            'message.required' => 'Le message est requis.',
            'message.max' => 'Le message ne peut pas dépasser 5000 caractères.',
        ];
    }
}
