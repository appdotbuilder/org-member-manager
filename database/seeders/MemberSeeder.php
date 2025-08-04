<?php

namespace Database\Seeders;

use App\Models\Member;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create administrator user
        $admin = User::create([
            'name' => 'Administrator',
            'email' => 'admin@serikatpekerja.com',
            'password' => Hash::make('password'),
            'role' => 'administrator',
            'email_verified_at' => now(),
        ]);

        // Create sample members
        $members = Member::factory()->count(50)->create();

        // Create some member users linked to actual members
        $sampleMembers = $members->take(5);
        
        foreach ($sampleMembers as $index => $member) {
            User::create([
                'name' => $member->full_name,
                'email' => 'member' . ($index + 1) . '@serikatpekerja.com',
                'password' => Hash::make('password'),
                'role' => 'member',
                'member_id' => $member->id,
                'email_verified_at' => now(),
            ]);
        }

        // Ensure we have some active and inactive members
        Member::factory()->active()->count(10)->create();
        Member::factory()->inactive()->count(5)->create();
    }
}