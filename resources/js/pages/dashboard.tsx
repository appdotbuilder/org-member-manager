import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { UsersIcon, BarChart3Icon, UserIcon, CalendarIcon } from 'lucide-react';

interface Props {
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

export default function Dashboard({ auth }: Props) {
    const isAdmin = auth.user.role === 'administrator';

    const adminFeatures = [
        {
            icon: '👥',
            title: 'Kelola Anggota',
            description: 'Tambah, edit, hapus, dan kelola data anggota serikat pekerja',
            href: '/members',
            color: 'bg-blue-50 border-blue-200 text-blue-700'
        },
        {
            icon: '➕',
            title: 'Tambah Anggota',
            description: 'Daftarkan anggota baru dengan ID otomatis',
            href: '/members/create',
            color: 'bg-green-50 border-green-200 text-green-700'
        },
        {
            icon: '📊',
            title: 'Laporan',
            description: 'Lihat analisis dan statistik keanggotaan',
            href: '/reports',
            color: 'bg-purple-50 border-purple-200 text-purple-700'
        }
    ];

    const memberFeatures = [
        {
            icon: '👤',
            title: 'Data Saya',
            description: 'Lihat informasi pribadi dan status keanggotaan',
            href: '/members',
            color: 'bg-blue-50 border-blue-200 text-blue-700'
        }
    ];

    const quickStats = [
        {
            icon: <UsersIcon className="h-6 w-6" />,
            title: 'Status Saya',
            value: isAdmin ? 'Administrator' : 'Anggota',
            color: isAdmin ? 'text-purple-600' : 'text-blue-600'
        },
        {
            icon: <UserIcon className="h-6 w-6" />,
            title: 'Nama',
            value: auth.user.name,
            color: 'text-gray-600'
        },
        {
            icon: <CalendarIcon className="h-6 w-6" />,
            title: 'Login Terakhir',
            value: 'Hari ini',
            color: 'text-green-600'
        }
    ];

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl">👋</div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Selamat datang, {auth.user.name}!
                            </h1>
                            <p className="text-gray-600">
                                {isAdmin 
                                    ? 'Kelola data anggota serikat pekerja dengan mudah dan efisien'
                                    : 'Lihat dan perbarui informasi keanggotaan Anda'
                                }
                            </p>
                            <Badge 
                                variant="outline" 
                                className={`mt-2 ${isAdmin ? 'border-purple-300 text-purple-700' : 'border-blue-300 text-blue-700'}`}
                            >
                                {isAdmin ? '🛡️ Administrator' : '👤 Anggota'}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickStats.map((stat, index) => (
                        <Card key={index}>
                            <CardContent className="pt-6">
                                <div className="flex items-center space-x-3">
                                    <div className={stat.color}>
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                                        <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Main Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <div className="text-xl">⚡</div>
                            <span>{isAdmin ? 'Panel Administrator' : 'Aksi Tersedia'}</span>
                        </CardTitle>
                        <CardDescription>
                            {isAdmin 
                                ? 'Fitur lengkap untuk mengelola sistem keanggotaan'
                                : 'Kelola informasi keanggotaan Anda'
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {(isAdmin ? adminFeatures : memberFeatures).map((feature, index) => (
                                <Link key={index} href={feature.href}>
                                    <Card className={`hover:shadow-md transition-shadow cursor-pointer ${feature.color} border-2`}>
                                        <CardContent className="pt-6">
                                            <div className="text-center space-y-3">
                                                <div className="text-3xl">{feature.icon}</div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                                                    <p className="text-sm opacity-80">{feature.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity (Admin Only) */}
                {isAdmin && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <BarChart3Icon className="h-5 w-5" />
                                <span>Aktivitas Terkini</span>
                            </CardTitle>
                            <CardDescription>
                                Ringkasan aktivitas sistem dalam beberapa waktu terakhir
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="text-green-600 text-xl">✅</div>
                                    <div>
                                        <p className="font-medium text-green-900">Sistem berjalan normal</p>
                                        <p className="text-sm text-green-700">Semua fitur tersedia dan dapat digunakan</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                        <h4 className="font-medium text-blue-900 mb-1">📊 Data Terkini</h4>
                                        <p className="text-sm text-blue-700">
                                            Akses laporan dan statistik keanggotaan terbaru
                                        </p>
                                    </div>
                                    
                                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                                        <h4 className="font-medium text-purple-900 mb-1">🔧 Manajemen</h4>
                                        <p className="text-sm text-purple-700">
                                            Kelola data anggota dengan fitur lengkap
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Help Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <div className="text-xl">❓</div>
                            <span>Bantuan & Informasi</span>
                        </CardTitle>
                        <CardDescription>
                            Tips dan panduan menggunakan sistem
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">🚀 Memulai</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {isAdmin ? (
                                        <>
                                            <li>• Tambah anggota baru dengan ID otomatis</li>
                                            <li>• Kelola data anggota yang sudah ada</li>
                                            <li>• Lihat laporan dan statistik</li>
                                            <li>• Catat anggota keluar jika diperlukan</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>• Lihat informasi keanggotaan Anda</li>
                                            <li>• Perbarui data pribadi</li>
                                            <li>• Pantau status keanggotaan</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">💡 Tips</h4>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Pastikan data selalu up-to-date</li>
                                    <li>• Gunakan fitur pencarian untuk efisiensi</li>
                                    <li>• Manfaatkan laporan untuk analisis</li>
                                    <li>• Hub admin jika ada kendala</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}