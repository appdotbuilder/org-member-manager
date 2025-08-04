import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeftIcon, UsersIcon, BuildingIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react';

interface MemberStats {
    total_members: number;
    active_members: number;
    inactive_members: number;
    recent_registrations: number;
    recent_departures: number;
}

interface CompanyData {
    company_name: string;
    count: number;
}

interface DepartmentData {
    department: string;
    count: number;
}

interface Props {
    stats: MemberStats;
    members_by_company: CompanyData[];
    members_by_department: DepartmentData[];
    [key: string]: unknown;
}

export default function MemberReports({ stats, members_by_company, members_by_department }: Props) {
    const activePercentage = stats.total_members > 0 ? Math.round((stats.active_members / stats.total_members) * 100) : 0;

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
                        <h1 className="text-2xl font-bold text-gray-900">📊 Laporan Keanggotaan</h1>
                        <p className="text-gray-600">
                            Analisis dan statistik anggota serikat pekerja
                        </p>
                    </div>
                </div>

                {/* Main Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_members}</div>
                            <p className="text-xs text-muted-foreground">
                                Keseluruhan anggota terdaftar
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Anggota Aktif</CardTitle>
                            <UsersIcon className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active_members}</div>
                            <p className="text-xs text-green-600">
                                {activePercentage}% dari total anggota
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tidak Aktif</CardTitle>
                            <UsersIcon className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{stats.inactive_members}</div>
                            <p className="text-xs text-red-600">
                                {100 - activePercentage}% dari total anggota
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pendaftar Baru</CardTitle>
                            <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">{stats.recent_registrations}</div>
                            <p className="text-xs text-blue-600">
                                30 hari terakhir
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Keluar</CardTitle>
                            <TrendingDownIcon className="h-4 w-4 text-orange-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{stats.recent_departures}</div>
                            <p className="text-xs text-orange-600">
                                30 hari terakhir
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Members by Company */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BuildingIcon className="h-5 w-5" />
                                <span>Anggota per Perusahaan</span>
                            </CardTitle>
                            <CardDescription>
                                Distribusi anggota berdasarkan perusahaan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {members_by_company.slice(0, 10).map((company) => {
                                    const percentage = stats.total_members > 0 ? Math.round((company.count / stats.total_members) * 100) : 0;
                                    return (
                                        <div key={company.company_name} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700 truncate flex-1 mr-2">
                                                    {company.company_name}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {company.count} ({percentage}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {members_by_company.length > 10 && (
                                    <p className="text-sm text-gray-500 text-center pt-2">
                                        Dan {members_by_company.length - 10} perusahaan lainnya...
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Members by Department */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BuildingIcon className="h-5 w-5" />
                                <span>Anggota per Departemen</span>
                            </CardTitle>
                            <CardDescription>
                                Distribusi anggota berdasarkan departemen
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {members_by_department.slice(0, 10).map((dept) => {
                                    const percentage = stats.total_members > 0 ? Math.round((dept.count / stats.total_members) * 100) : 0;
                                    return (
                                        <div key={dept.department} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-700 truncate flex-1 mr-2">
                                                    {dept.department}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {dept.count} ({percentage}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                                {members_by_department.length > 10 && (
                                    <p className="text-sm text-gray-500 text-center pt-2">
                                        Dan {members_by_department.length - 10} departemen lainnya...
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">📈 Tren Keanggotaan</CardTitle>
                            <CardDescription>
                                Aktivitas keanggotaan dalam 30 hari terakhir
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <TrendingUpIcon className="h-6 w-6 text-green-600" />
                                        <div>
                                            <p className="font-medium text-green-900">Pendaftar Baru</p>
                                            <p className="text-sm text-green-700">Anggota yang baru bergabung</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-green-600">
                                        {stats.recent_registrations}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <TrendingDownIcon className="h-6 w-6 text-orange-600" />
                                        <div>
                                            <p className="font-medium text-orange-900">Keluar</p>
                                            <p className="text-sm text-orange-700">Anggota yang berhenti</p>
                                        </div>
                                    </div>
                                    <div className="text-2xl font-bold text-orange-600">
                                        {stats.recent_departures}
                                    </div>
                                </div>

                                <div className="pt-3 border-t">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">Net Growth</span>
                                        <span className={`text-sm font-bold ${
                                            (stats.recent_registrations - stats.recent_departures) >= 0 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
                                        }`}>
                                            {stats.recent_registrations - stats.recent_departures >= 0 ? '+' : ''}
                                            {stats.recent_registrations - stats.recent_departures}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">🎯 Ringkasan Eksekutif</CardTitle>
                            <CardDescription>
                                Poin-poin penting dari data keanggotaan
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">📊 Status Keanggotaan</h4>
                                    <p className="text-sm text-blue-700">
                                        {activePercentage}% anggota masih aktif dari total {stats.total_members} anggota terdaftar.
                                    </p>
                                </div>

                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <h4 className="font-medium text-purple-900 mb-2">🏢 Sebaran Organisasi</h4>
                                    <p className="text-sm text-purple-700">
                                        Anggota tersebar di {members_by_company.length} perusahaan dan {members_by_department.length} departemen yang berbeda.
                                    </p>
                                </div>

                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <h4 className="font-medium text-gray-900 mb-2">📅 Aktivitas Terkini</h4>
                                    <p className="text-sm text-gray-700">
                                        Dalam 30 hari terakhir, terdapat {stats.recent_registrations} pendaftar baru dan {stats.recent_departures} anggota yang keluar.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Aksi Cepat</CardTitle>
                        <CardDescription>
                            Tindakan yang dapat Anda lakukan berdasarkan laporan ini
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/members/create">
                                <Button>
                                    ➕ Tambah Anggota Baru
                                </Button>
                            </Link>
                            <Link href="/members">
                                <Button variant="outline">
                                    👥 Kelola Anggota
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={() => window.print()}>
                                🖨️ Cetak Laporan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}