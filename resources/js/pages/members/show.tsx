import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, EditIcon, TrashIcon } from 'lucide-react';

interface Member {
    id: number;
    member_id: string;
    full_name: string;
    employee_id: string;
    company_name: string;
    department: string;
    phone_number: string;
    email: string;
    membership_start_date: string;
    membership_end_date?: string;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    member: Member;
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
            member_id?: number;
        };
    };
    [key: string]: unknown;
}

export default function ShowMember({ member, auth }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data anggota ini?')) {
            router.delete(`/members/${member.id}`);
        }
    };

    const isAdmin = auth.user.role === 'administrator';
    const canEdit = isAdmin || auth.user.member_id === member.id;

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/members">
                            <Button variant="outline" size="sm">
                                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                {isAdmin ? 'Kembali ke Daftar' : 'Kembali'}
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">👤 Detail Anggota</h1>
                            <p className="text-gray-600">
                                Informasi lengkap anggota serikat pekerja
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {canEdit && (
                            <Link href={`/members/${member.id}/edit`}>
                                <Button variant="outline">
                                    <EditIcon className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                            </Link>
                        )}
                        {isAdmin && (
                            <Button variant="destructive" onClick={handleDelete}>
                                <TrashIcon className="h-4 w-4 mr-2" />
                                Hapus
                            </Button>
                        )}
                    </div>
                </div>

                {/* Member Info Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl flex items-center space-x-3">
                                    <span>{member.full_name}</span>
                                    <Badge 
                                        variant={member.status === 'active' ? 'default' : 'secondary'}
                                        className={member.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                    >
                                        {member.status === 'active' ? '✅ Aktif' : '❌ Tidak Aktif'}
                                    </Badge>
                                </CardTitle>
                                <CardDescription className="text-lg font-mono text-blue-600">
                                    ID Anggota: {member.member_id}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    📋 Informasi Pribadi
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                                        <p className="text-base text-gray-900">{member.full_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">ID Karyawan</label>
                                        <p className="text-base text-gray-900">{member.employee_id}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nomor Kontak</label>
                                        <p className="text-base text-gray-900">{member.phone_number}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Alamat Email</label>
                                        <p className="text-base text-gray-900">{member.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Work Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                                    🏢 Informasi Pekerjaan
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Nama Perusahaan</label>
                                        <p className="text-base text-gray-900">{member.company_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Departemen</label>
                                        <p className="text-base text-gray-900">{member.department}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500">Tanggal Mulai Keanggotaan</label>
                                        <p className="text-base text-gray-900">{formatDate(member.membership_start_date)}</p>
                                    </div>
                                    {member.membership_end_date && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Tanggal Berakhir Keanggotaan</label>
                                            <p className="text-base text-red-600">{formatDate(member.membership_end_date)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Membership History Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>📅 Riwayat Keanggotaan</CardTitle>
                        <CardDescription>
                            Informasi terkait riwayat keanggotaan anggota
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium text-green-900">Bergabung</p>
                                        <p className="text-sm text-green-700">{formatDate(member.membership_start_date)}</p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="border-green-300 text-green-700">
                                    ✅ Terdaftar
                                </Badge>
                            </div>

                            {member.membership_end_date ? (
                                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium text-red-900">Keluar</p>
                                            <p className="text-sm text-red-700">{formatDate(member.membership_end_date)}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-red-300 text-red-700">
                                        ❌ Tidak Aktif
                                    </Badge>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                                        <div>
                                            <p className="font-medium text-blue-900">Status Saat Ini</p>
                                            <p className="text-sm text-blue-700">Anggota aktif</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                                        🔄 Aktif
                                    </Badge>
                                </div>
                            )}

                            <div className="pt-4 border-t text-center text-sm text-gray-500">
                                <p>
                                    Data terakhir diperbarui: {formatDate(member.updated_at)}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons for Members */}
                {!isAdmin && auth.user.member_id === member.id && (
                    <Card>
                        <CardHeader>
                            <CardTitle>⚙️ Aksi Tersedia</CardTitle>
                            <CardDescription>
                                Tindakan yang dapat Anda lakukan terhadap data Anda
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex space-x-3">
                                <Link href={`/members/${member.id}/edit`}>
                                    <Button>
                                        <EditIcon className="h-4 w-4 mr-2" />
                                        Perbarui Data Saya
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}