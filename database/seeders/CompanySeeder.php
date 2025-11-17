<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Subscription;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            [
                'name' => 'TechCorp Solutions',
                'email' => 'info@techcorp.com',
                'phone' => '+1-555-0100',
                'website' => 'https://techcorp.com',
                'industry' => 'Technology',
                'plan' => 'professional',
                'status' => 'active',
            ],
            [
                'name' => 'RetailHub Inc',
                'email' => 'support@retailhub.com',
                'phone' => '+1-555-0200',
                'website' => 'https://retailhub.com',
                'industry' => 'E-commerce',
                'plan' => 'business',
                'status' => 'active',
            ],
            [
                'name' => 'HealthCare Plus',
                'email' => 'hello@healthcareplus.com',
                'phone' => '+1-555-0300',
                'website' => 'https://healthcareplus.com',
                'industry' => 'Healthcare',
                'plan' => 'enterprise',
                'status' => 'active',
            ],
            [
                'name' => 'EduLearn Academy',
                'email' => 'admin@edulearn.com',
                'phone' => '+1-555-0400',
                'website' => 'https://edulearn.com',
                'industry' => 'Education',
                'plan' => 'professional',
                'status' => 'trial',
            ],
            [
                'name' => 'FinanceHub',
                'email' => 'contact@financehub.com',
                'phone' => '+1-555-0500',
                'website' => 'https://financehub.com',
                'industry' => 'Finance',
                'plan' => 'business',
                'status' => 'active',
            ],
        ];

        foreach ($companies as $companyData) {
            $company = Company::create([
                'name' => $companyData['name'],
                'email' => $companyData['email'],
                'phone' => $companyData['phone'],
                'website' => $companyData['website'],
                'industry' => $companyData['industry'],
                'company_size' => rand(10, 500),
                'address' => fake()->streetAddress(),
                'city' => fake()->city(),
                'state' => fake()->state(),
                'country' => 'United States',
                'zip_code' => fake()->postcode(),
                'timezone' => 'America/New_York',
                'currency' => 'USD',
                'widget_id' => Str::uuid(),
                'is_active' => $companyData['status'] === 'active',
            ]);

            // Create subscription
            $planPricing = [
                'professional' => 49,
                'business' => 99,
                'enterprise' => 199,
            ];

            Subscription::create([
                'company_id' => $company->id,
                'plan' => $companyData['plan'],
                'status' => $companyData['status'],
                'price' => $planPricing[$companyData['plan']],
                'billing_cycle' => 'monthly',
                'trial_ends_at' => $companyData['status'] === 'trial' ? Carbon::now()->addDays(14) : null,
                'current_period_start' => Carbon::now(),
                'current_period_end' => Carbon::now()->addMonth(),
            ]);

            $this->command->info("✓ Company created: {$company->name} ({$companyData['plan']})");
        }
    }
}
