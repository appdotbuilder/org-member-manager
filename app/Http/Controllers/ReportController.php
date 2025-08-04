<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display member reports.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        
        if (!$user?->isAdministrator()) {
            abort(403, 'Hanya administrator yang dapat melihat laporan.');
        }
        
        $totalMembers = Member::count();
        $activeMembers = Member::active()->count();
        $inactiveMembers = Member::where('status', 'inactive')->count();
        
        // Members by company
        $membersByCompany = Member::selectRaw('company_name, COUNT(*) as count')
            ->groupBy('company_name')
            ->orderByDesc('count')
            ->get();
        
        // Members by department
        $membersByDepartment = Member::selectRaw('department, COUNT(*) as count')
            ->groupBy('department')
            ->orderByDesc('count')
            ->get();
        
        // Recent registrations (last 30 days)
        $recentRegistrations = Member::where('created_at', '>=', now()->subDays(30))
            ->count();
        
        // Recent departures (last 30 days)
        $recentDepartures = Member::where('membership_end_date', '>=', now()->subDays(30))
            ->whereNotNull('membership_end_date')
            ->count();
        
        return Inertia::render('members/reports', [
            'stats' => [
                'total_members' => $totalMembers,
                'active_members' => $activeMembers,
                'inactive_members' => $inactiveMembers,
                'recent_registrations' => $recentRegistrations,
                'recent_departures' => $recentDepartures,
            ],
            'members_by_company' => $membersByCompany,
            'members_by_department' => $membersByDepartment,
        ]);
    }
}