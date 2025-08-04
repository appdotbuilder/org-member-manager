import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { ArrowLeftIcon, SaveIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CreateMember() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        employee_id: '',
        company_name: '',
        department: '',
        phone_number: '',
        email: '',
        membership_start_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/members');
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-4">
                    <Link href="/members">
                        <Button variant="outline" size="sm">
                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                            Kembali
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">➕ Tambah Anggota Baru</h1>
                        <p className="text-gray-600">
                            Daftarkan anggota baru serikat pekerja
                        </p>
                    </div>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>📝 Informasi Anggota</CardTitle>
                        <CardDescription>
                            Isi formulir di bawah untuk mendaftarkan anggota baru. 
                            Nomor ID anggota akan dibuat otomatis setelah data tersimpan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">
                                        👤 Nama Lengkap <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="Masukkan nama lengkap"
                                        className={errors.full_name ? 'border-red-500' : ''}
                                    />
                                    {errors.full_name && (
                                        <p className="text-sm text-red-600">{errors.full_name}</p>
                                    )}
                                </div>

                                {/* Employee ID */}
                                <div className="space-y-2">
                                    <Label htmlFor="employee_id">
                                        🆔 Nomor Identitas Karyawan <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="employee_id"
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        placeholder="Masukkan nomor identitas karyawan"
                                        className={errors.employee_id ? 'border-red-500' : ''}
                                    />
                                    {errors.employee_id && (
                                        <p className="text-sm text-red-600">{errors.employee_id}</p>
                                    )}
                                </div>

                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="company_name">
                                        🏢 Nama Perusahaan <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="company_name"
                                        type="text"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="Masukkan nama perusahaan"
                                        className={errors.company_name ? 'border-red-500' : ''}
                                    />
                                    {errors.company_name && (
                                        <p className="text-sm text-red-600">{errors.company_name}</p>
                                    )}
                                </div>

                                {/* Department */}
                                <div className="space-y-2">
                                    <Label htmlFor="department">
                                        🏭 Departemen <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="department"
                                        type="text"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        placeholder="Masukkan nama departemen"
                                        className={errors.department ? 'border-red-500' : ''}
                                    />
                                    {errors.department && (
                                        <p className="text-sm text-red-600">{errors.department}</p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">
                                        📞 Nomor Kontak <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="phone_number"
                                        type="tel"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        placeholder="Masukkan nomor kontak"
                                        className={errors.phone_number ? 'border-red-500' : ''}
                                    />
                                    {errors.phone_number && (
                                        <p className="text-sm text-red-600">{errors.phone_number}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        📧 Alamat Email <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="Masukkan alamat email"
                                        className={errors.email ? 'border-red-500' : ''}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Membership Start Date */}
                            <div className="space-y-2">
                                <Label htmlFor="membership_start_date">
                                    📅 Tanggal Mulai Keanggotaan <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="membership_start_date"
                                    type="date"
                                    value={data.membership_start_date}
                                    onChange={(e) => setData('membership_start_date', e.target.value)}
                                    className={errors.membership_start_date ? 'border-red-500' : ''}
                                />
                                {errors.membership_start_date && (
                                    <p className="text-sm text-red-600">{errors.membership_start_date}</p>
                                )}
                            </div>

                            {/* Info Box */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-start space-x-3">
                                    <div className="text-blue-600 text-xl">ℹ️</div>
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-900">Informasi Penting</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Setelah data tersimpan, sistem akan otomatis membuat nomor ID anggota 
                                            dengan format SP[TAHUN][NOMOR URUT] (contoh: SP20240001).
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                <Link href="/members">
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <SaveIcon className="h-4 w-4 mr-2" />
                                    {processing ? 'Menyimpan...' : 'Simpan Anggota'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}