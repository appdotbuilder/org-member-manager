<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        // Regular members can only see their own data
        if ($user?->isMember()) {
            $member = $user->member;
            return Inertia::render('members/show', [
                'member' => $member
            ]);
        }
        
        // Administrators can see all members
        $query = Member::query();
        
        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('member_id', 'like', "%{$search}%")
                  ->orWhere('employee_id', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }
        
        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        // Filter by company
        if ($request->filled('company')) {
            $query->where('company_name', $request->company);
        }
        
        // Filter by department
        if ($request->filled('department')) {
            $query->where('department', $request->department);
        }
        
        $members = $query->latest()->paginate(10);
        
        // Get filter options
        $companies = Member::distinct()->pluck('company_name')->sort()->values();
        $departments = Member::distinct()->pluck('department')->sort()->values();
        
        return Inertia::render('members/index', [
            'members' => $members,
            'filters' => [
                'search' => $request->search,
                'status' => $request->status,
                'company' => $request->company,
                'department' => $request->department,
            ],
            'companies' => $companies,
            'departments' => $departments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        
        if (!$user?->isAdministrator()) {
            abort(403, 'Hanya administrator yang dapat menambah anggota baru.');
        }
        
        return Inertia::render('members/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $member = Member::create($request->validated());

        return redirect()->route('members.show', $member)
            ->with('success', 'Anggota berhasil didaftarkan dengan ID: ' . $member->member_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $user = auth()->user();
        
        // Regular members can only see their own data
        if ($user?->isMember() && $user->member_id !== $member->id) {
            abort(403, 'Tidak diizinkan mengakses data anggota lain.');
        }
        
        return Inertia::render('members/show', [
            'member' => $member
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        $user = auth()->user();
        
        // Regular members can only edit their own data
        if ($user?->isMember() && $user->member_id !== $member->id) {
            abort(403, 'Tidak diizinkan mengedit data anggota lain.');
        }
        
        return Inertia::render('members/edit', [
            'member' => $member
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberRequest $request, Member $member)
    {
        $data = $request->validated();
        
        // Update status based on membership_end_date
        if (!empty($data['membership_end_date'])) {
            $data['status'] = 'inactive';
        } else {
            $data['status'] = 'active';
        }
        
        $member->update($data);

        return redirect()->route('members.show', $member)
            ->with('success', 'Data anggota berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $user = auth()->user();
        
        if (!$user?->isAdministrator()) {
            abort(403, 'Hanya administrator yang dapat menghapus data anggota.');
        }
        
        $member->delete();

        return redirect()->route('members.index')
            ->with('success', 'Data anggota berhasil dihapus.');
    }


}