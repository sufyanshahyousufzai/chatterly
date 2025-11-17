<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->command->info('🚀 Starting CHATTERLY Platform Seeding...');
        $this->command->newLine();

        // Seed in order of dependencies
        $this->call([
            SuperAdminSeeder::class,
            CompanySeeder::class,
            StaffSeeder::class,
            ClientSeeder::class,
            ChatSeeder::class,
            TicketSeeder::class,
            SettingsSeeder::class,
            FeedbackSeeder::class,
        ]);

        $this->command->newLine();
        $this->command->info('✅ CHATTERLY Platform Seeding Complete!');
        $this->command->newLine();
        $this->command->info('Login Credentials:');
        $this->command->info('─────────────────────────────────────');
        $this->command->info('Super Admin:');
        $this->command->info('  Email: admin@chatterly.com');
        $this->command->info('  Password: password');
        $this->command->newLine();
        $this->command->info('All Staff & Clients:');
        $this->command->info('  Password: password');
        $this->command->newLine();
    }
}
