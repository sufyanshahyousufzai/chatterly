<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SuperAdmin;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        SuperAdmin::create([
            'name' => 'Super Administrator',
            'email' => 'admin@chatterly.com',
            'password' => Hash::make('password'),
            'is_active' => true,
        ]);

        $this->command->info('✓ Super Admin created: admin@chatterly.com / password');
    }
}
