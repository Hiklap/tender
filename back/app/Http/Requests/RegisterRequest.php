<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
    public function rules()
    {
        return [
            'username' => 'required',
            'email' => ['required', 'email', 'max:255'],
            'password' => 'required|min:6',
            'age'=> 'nullable|integer',
            'gender' => 'nullable|string',
            'height' => 'nullable|string',
            'weight' => 'nullable|string',
            'role' => 'nullable|string',
        ];
    }

    /**
     * Сообщения об ошибках для валидации.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'username.required' => 'Имя пользователя обязательно.',
            'username.string' => 'Имя пользователя должно быть строкой.',
            'username.max' => 'Имя пользователя не может быть больше 255 символов.',
            'email.required' => 'Электронная почта обязательна.',
            'email.email' => 'Введите корректный адрес электронной почты.',
            'email.exists' => 'Пользователь с таким email не найден.',
            'password.required' => 'Пароль обязателен.',
            'password.string' => 'Пароль должен быть строкой.',
            'password.min' => 'Пароль должен содержать минимум 6 символов.',
        ];
    }
}
