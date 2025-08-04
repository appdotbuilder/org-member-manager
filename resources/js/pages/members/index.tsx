import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, router } from '@inertiajs/react';
import { PlusIcon, SearchIcon, UserIcon, BuildingIcon } from 'lucide-react';

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
}

interface PaginatedMembers {
    data: Member[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    members: PaginatedMembers;
    filters: {
        search?: string;
        status?: string;
        company?: string;
        department?: string;
    };
    companies: string[];
    departments: string[];
    [key: string]: unknown;
}

export default function MembersIndex({ members, filters, companies, departments }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
    const [statusFilter, setStatusFilter] = React.useState(filters.status || '');
    const [companyFilter, setCompanyFilter] = React.useState(filters.company || '');
    const [departmentFilter, setDepartmentFilter] = React.useState(filters.department || '');

    const handleSearch = () => {
        router.get('/members', {
            search: searchTerm,
            status: statusFilter,
            company: companyFilter,
            department: departmentFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setSearchTerm('');
        setStatusFilter('');
        setCompanyFilter('');
        setDepartmentFilter('');
        router.get('/members', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">👥 Manajemen Anggota</h1>
                        <p className="text-gray-600">
                            Kelola data anggota serikat pekerja
                        </p>
                    </div>
                    <Link href="/members/create">
                        <Button>
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Tambah Anggota
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Anggota</CardTitle>
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{members.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Anggota Aktif</CardTitle>
                            <UserIcon className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {members.data.filter(m => m.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Perusahaan</CardTitle>
                            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{companies.length}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Departemen</CardTitle>
                            <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{departments.length}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">🔍 Filter & Pencarian</CardTitle>
                        <CardDescription>
                            Gunakan filter untuk menemukan anggota dengan cepat
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div className="md:col-span-2">
                                <Input
                                    placeholder="Cari nama, ID, atau email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Status</SelectItem>
                                    <SelectItem value="active">Aktif</SelectItem>
                                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={companyFilter} onValueChange={setCompanyFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Perusahaan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Semua Perusahaan</SelectItem>
                                    {companies.map((company) => (
                                        <SelectItem key={company} value={company}>
                                            {company}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex space-x-2">
                                <Button onClick={handleSearch} className="flex-1">
                                    <SearchIcon className="h-4 w-4 mr-2" />
                                    Cari
                                </Button>
                                <Button variant="outline" onClick={resetFilters}>
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Members List */}
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Daftar Anggota</CardTitle>
                                <CardDescription>
                                    Menampilkan {members.from}-{members.to} dari {members.total} anggota
                                </CardDescription>
                            </div>
                            <Link href="/reports">
                                <Button variant="outline">
                                    📊 Lihat Laporan
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {members.data.map((member) => (
                                <div
                                    key={member.id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {member.full_name}
                                                </h3>
                                                <Badge 
                                                    variant={member.status === 'active' ? 'default' : 'secondary'}
                                                    className={member.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                                >
                                                    {member.status === 'active' ? '✅ Aktif' : '❌ Tidak Aktif'}
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">ID Anggota:</span> {member.member_id}
                                                </div>
                                                <div>
                                                    <span className="font-medium">ID Karyawan:</span> {member.employee_id}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Email:</span> {member.email}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Perusahaan:</span> {member.company_name}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Departemen:</span> {member.department}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Bergabung:</span> {formatDate(member.membership_start_date)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Link href={`/members/${member.id}`}>
                                                <Button variant="outline" size="sm">
                                                    👁️ Lihat
                                                </Button>
                                            </Link>
                                            <Link href={`/members/${member.id}/edit`}>
                                                <Button variant="outline" size="sm">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {members.last_page > 1 && (
                            <div className="flex justify-center mt-6 space-x-2">
                                {Array.from({ length: members.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === members.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => router.get(`/members?page=${page}`, filters)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}