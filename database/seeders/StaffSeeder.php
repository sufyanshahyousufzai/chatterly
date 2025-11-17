<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class StaffSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        $positions = [
            'Support Manager',
            'Senior Support Agent',
            'Support Agent',
            'Technical Support',
            'Customer Success Manager',
        ];

        $departments = ['Support', 'Customer Success', 'Technical'];

        foreach ($companies as $company) {
            $staffCount = rand(3, 8);

            for ($i = 1; $i <= $staffCount; $i++) {
                $firstName = fake()->firstName();
                $lastName = fake()->lastName();
                $email = strtolower($firstName . '.' . $lastName . '@' . str_replace(' ', '', strtolower($company->name)) . '.com');

                Staff::create([
                    'company_id' => $company->id,
                    'employee_id' => 'EMP' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'name' => $firstName . ' ' . $lastName,
                    'email' => $email,
                    'password' => Hash::make('password'),
                    'phone' => fake()->phoneNumber(),
                    'designation' => $positions[array_rand($positions)],
                    'department' => $departments[array_rand($departments)],
                    'hire_date' => Carbon::now()->subMonths(rand(1, 24)),
                    'salary' => rand(40000, 90000),
                    'is_active' => true,
                ]);
            }

            $this->command->info("✓ Created {$staffCount} staff members for {$company->name}");
        }
    }
}
