<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()?->isAdministrator() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:255',
            'employee_id' => 'required|string|max:50|unique:members,employee_id',
            'company_name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|unique:members,email',
            'membership_start_date' => 'required|date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Nama lengkap wajib diisi.',
            'employee_id.required' => 'Nomor identitas karyawan wajib diisi.',
            'employee_id.unique' => 'Nomor identitas karyawan sudah terdaftar.',
            'company_name.required' => 'Nama perusahaan wajib diisi.',
            'department.required' => 'Departemen wajib diisi.',
            'phone_number.required' => 'Nomor kontak wajib diisi.',
            'email.required' => 'Alamat email wajib diisi.',
            'email.email' => 'Format alamat email tidak valid.',
            'email.unique' => 'Alamat email sudah terdaftar.',
            'membership_start_date.required' => 'Tanggal mulai keanggotaan wajib diisi.',
            'membership_start_date.date' => 'Format tanggal tidak valid.',
        ];
    }
}