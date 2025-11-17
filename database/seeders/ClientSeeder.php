<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;

class ClientSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        foreach ($companies as $company) {
            $clientCount = rand(10, 25);

            for ($i = 1; $i <= $clientCount; $i++) {
                $firstName = fake()->firstName();
                $lastName = fake()->lastName();

                Client::create([
                    'company_id' => $company->id,
                    'client_id' => 'CLI' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'name' => $firstName . ' ' . $lastName,
                    'email' => fake()->unique()->safeEmail(),
                    'password' => Hash::make('password'),
                    'phone' => fake()->phoneNumber(),
                    'company_name' => fake()->company(),
                    'address' => fake()->streetAddress(),
                    'city' => fake()->city(),
                    'country' => fake()->country(),
                    'is_active' => true,
                ]);
            }

            $this->command->info("✓ Created {$clientCount} clients for {$company->name}");
        }
    }
}
