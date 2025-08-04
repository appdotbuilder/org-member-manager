<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = auth()->user();
        
        // Administrator can update any member
        if ($user?->isAdministrator()) {
            return true;
        }
        
        // Regular member can only update their own data
        if ($user?->isMember() && $user->member_id === $this->route('member')->id) {
            return true;
        }
        
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $member = $this->route('member');
        
        return [
            'full_name' => 'required|string|max:255',
            'employee_id' => 'required|string|max:50|unique:members,employee_id,' . $member->id,
            'company_name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|unique:members,email,' . $member->id,
            'membership_start_date' => 'required|date',
            'membership_end_date' => 'nullable|date|after:membership_start_date',
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
            'membership_end_date.date' => 'Format tanggal tidak valid.',
            'membership_end_date.after' => 'Tanggal berakhir harus setelah tanggal mulai keanggotaan.',
        ];
    }
}