import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    const features = [
        {
            icon: '👥',
            title: 'Manajemen Anggota',
            description: 'Kelola data lengkap anggota serikat pekerja dengan mudah dan terorganisir'
        },
        {
            icon: '🆔',
            title: 'ID Otomatis',
            description: 'Sistem pemberian nomor identitas anggota otomatis dengan format standar'
        },
        {
            icon: '📊',
            title: 'Laporan & Analisis',
            description: 'Dapatkan insight mendalam tentang keanggotaan dengan laporan komprehensif'
        },
        {
            icon: '🔍',
            title: 'Pencarian Cerdas',
            description: 'Temukan anggota dengan cepat berdasarkan nama, perusahaan, atau departemen'
        }
    ];

    const userRoles = [
        {
            icon: '🛡️',
            title: 'Administrator',
            description: 'Akses penuh untuk mengelola semua data anggota, laporan, dan sistem'
        },
        {
            icon: '👤',
            title: 'Anggota',
            description: 'Dapat melihat dan memperbarui informasi pribadi mereka sendiri'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-xl font-bold text-blue-600">
                                    🏢 Serikat Pekerja
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth?.user ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-700">
                                        Selamat datang, {auth.user.name}
                                    </span>
                                    <Link href="/dashboard">
                                        <Button variant="outline">Dashboard</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link href="/login">
                                        <Button variant="outline">Masuk</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button>Daftar</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                        🤝 Sistem Manajemen
                        <span className="text-blue-600 block">Anggota Serikat Pekerja</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Platform terpadu untuk mengelola data anggota organisasi serikat perusahaan. 
                        Mudah, efisien, dan terintegrasi dengan sistem pelaporan yang komprehensif.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        {auth?.user ? (
                            <div className="space-y-2 sm:space-y-0 sm:space-x-3 sm:flex">
                                <Link href="/members">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        📋 Kelola Anggota
                                    </Button>
                                </Link>
                                <Link href="/reports">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        📊 Lihat Laporan
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2 sm:space-y-0 sm:space-x-3 sm:flex">
                                <Link href="/register">
                                    <Button size="lg" className="w-full sm:w-auto">
                                        🚀 Mulai Sekarang
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                        🔑 Masuk
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                            Fitur Utama
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Solusi Lengkap Manajemen Keanggotaan
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {features.map((feature, index) => (
                                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="text-4xl mb-3">{feature.icon}</div>
                                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* User Roles Section */}
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                            Peran Pengguna
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Akses Sesuai Kebutuhan
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                            {userRoles.map((role, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center space-x-3">
                                            <div className="text-3xl">{role.icon}</div>
                                            <CardTitle className="text-xl">{role.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {role.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Siap memulai?</span>
                        <span className="block">Daftar sekarang dan kelola anggota Anda!</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-200">
                        Bergabunglah dengan ribuan organisasi yang telah mempercayai platform kami 
                        untuk mengelola data anggota mereka dengan efisien dan aman.
                    </p>
                    <div className="mt-8">
                        {auth?.user ? (
                            <Link href="/members">
                                <Button size="lg" variant="secondary" className="text-blue-600">
                                    🎯 Mulai Kelola Anggota
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/register">
                                <Button size="lg" variant="secondary" className="text-blue-600">
                                    📝 Daftar Gratis
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-base text-gray-400">
                            © 2024 Sistem Manajemen Anggota Serikat Pekerja. Semua hak dilindungi.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}