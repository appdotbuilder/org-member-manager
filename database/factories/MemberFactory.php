<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Member>
 */
class MemberFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Member>
     */
    protected $model = Member::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $companies = [
            'PT Maju Bersama',
            'PT Sejahtera Abadi',
            'PT Karya Utama',
            'PT Sumber Rezeki',
            'PT Bumi Makmur',
            'PT Jaya Mandiri',
            'PT Harapan Bangsa',
            'PT Sukses Bersama'
        ];

        $departments = [
            'Produksi',
            'Quality Control',
            'Human Resources',
            'Keuangan',
            'Marketing',
            'Engineering',
            'Maintenance',
            'Warehouse',
            'Administration',
            'Security'
        ];

        return [
            'full_name' => $this->faker->name(),
            'employee_id' => $this->faker->unique()->numerify('EMP####'),
            'company_name' => $this->faker->randomElement($companies),
            'department' => $this->faker->randomElement($departments),
            'phone_number' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'membership_start_date' => $this->faker->dateTimeBetween('-5 years', 'now'),
            'membership_end_date' => $this->faker->optional(0.1)->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the member is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'membership_end_date' => null,
        ]);
    }

    /**
     * Indicate that the member is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
            'membership_end_date' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ]);
    }
}