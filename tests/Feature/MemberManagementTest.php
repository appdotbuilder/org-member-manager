<?php

namespace Tests\Feature;

use App\Models\Member;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MemberManagementTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test that welcome page displays correctly.
     */
    public function test_welcome_page_displays_correctly(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('welcome')
        );
    }

    /**
     * Test that administrator can view members index.
     */
    public function test_administrator_can_view_members_index(): void
    {
        $admin = User::factory()->create([
            'role' => 'administrator'
        ]);

        Member::factory()->count(5)->create();

        $response = $this->actingAs($admin)->get('/members');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('members/index')
                ->has('members.data', 5)
        );
    }

    /**
     * Test that regular member sees their own data.
     */
    public function test_regular_member_sees_own_data(): void
    {
        $member = Member::factory()->create();
        $user = User::factory()->create([
            'role' => 'member',
            'member_id' => $member->id
        ]);

        $response = $this->actingAs($user)->get('/members');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('members/show')
                ->where('member.id', $member->id)
        );
    }

    /**
     * Test that administrator can create new member.
     */
    public function test_administrator_can_create_member(): void
    {
        $admin = User::factory()->create([
            'role' => 'administrator'
        ]);

        $memberData = [
            'full_name' => 'John Doe',
            'employee_id' => 'EMP001',
            'company_name' => 'PT Test Company',
            'department' => 'IT',
            'phone_number' => '081234567890',
            'email' => 'john.doe@test.com',
            'membership_start_date' => '2024-01-01',
        ];

        $response = $this->actingAs($admin)->post('/members', $memberData);

        $response->assertRedirect();
        $this->assertDatabaseHas('members', [
            'full_name' => 'John Doe',
            'employee_id' => 'EMP001'
        ]);
    }

    /**
     * Test that regular member cannot create new member.
     */
    public function test_regular_member_cannot_create_member(): void
    {
        $member = Member::factory()->create();
        $user = User::factory()->create([
            'role' => 'member',
            'member_id' => $member->id
        ]);

        $memberData = [
            'full_name' => 'Jane Doe',
            'employee_id' => 'EMP002',
            'company_name' => 'PT Test Company',
            'department' => 'HR',
            'phone_number' => '081234567891',
            'email' => 'jane.doe@test.com',
            'membership_start_date' => '2024-01-01',
        ];

        $response = $this->actingAs($user)->post('/members', $memberData);

        $response->assertStatus(403);
    }

    /**
     * Test that member ID is auto-generated.
     */
    public function test_member_id_is_auto_generated(): void
    {
        $member = Member::factory()->create();

        $this->assertNotNull($member->member_id);
        $this->assertStringStartsWith('SP' . date('Y'), $member->member_id);
    }

    /**
     * Test that administrator can view reports.
     */
    public function test_administrator_can_view_reports(): void
    {
        $admin = User::factory()->create([
            'role' => 'administrator'
        ]);

        Member::factory()->count(10)->active()->create();
        Member::factory()->count(2)->inactive()->create();

        $response = $this->actingAs($admin)->get('/reports');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('members/reports')
                ->where('stats.total_members', 12)
                ->where('stats.active_members', 10)
                ->where('stats.inactive_members', 2)
        );
    }

    /**
     * Test that regular member cannot view reports.
     */
    public function test_regular_member_cannot_view_reports(): void
    {
        $member = Member::factory()->create();
        $user = User::factory()->create([
            'role' => 'member',
            'member_id' => $member->id
        ]);

        $response = $this->actingAs($user)->get('/reports');

        $response->assertStatus(403);
    }
}