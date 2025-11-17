<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Staff;
use App\Models\Client;
use App\Models\Ticket;
use App\Models\TicketReply;
use Carbon\Carbon;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        $subjects = [
            'Account Login Issue',
            'Billing Question',
            'Feature Request',
            'Bug Report - Dashboard',
            'Integration Help Needed',
            'API Documentation',
            'Performance Issue',
            'Mobile App Problem',
            'Data Export Request',
            'Account Upgrade',
        ];

        $priorities = ['low', 'medium', 'high', 'urgent'];
        $statuses = ['open', 'in_progress', 'waiting_client', 'resolved', 'closed'];
        $categories = ['technical', 'billing', 'general', 'feature_request'];

        foreach ($companies as $company) {
            $staff = Staff::where('company_id', $company->id)->get();
            $clients = Client::where('company_id', $company->id)->get();

            if ($staff->isEmpty() || $clients->isEmpty()) {
                continue;
            }

            $ticketCount = rand(20, 40);

            for ($i = 1; $i <= $ticketCount; $i++) {
                $client = $clients->random();
                $assignedStaff = $staff->random();
                $status = $statuses[array_rand($statuses)];
                $priority = $priorities[array_rand($priorities)];

                $ticket = Ticket::create([
                    'company_id' => $company->id,
                    'ticket_id' => 'TICK' . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'client_id' => $client->id,
                    'assigned_to' => rand(0, 1) ? $assignedStaff->id : null,
                    'subject' => $subjects[array_rand($subjects)],
                    'description' => fake()->paragraph(3),
                    'priority' => $priority,
                    'status' => $status,
                    'category' => $categories[array_rand($categories)],
                    'created_at' => Carbon::now()->subDays(rand(0, 60)),
                ]);

                // Add replies
                $replyCount = rand(1, 5);

                for ($r = 0; $r < $replyCount; $r++) {
                    $isStaff = $r % 2 === 1;

                    TicketReply::create([
                        'ticket_id' => $ticket->id,
                        'user_type' => $isStaff ? 'staff' : 'client',
                        'user_id' => $isStaff ? $assignedStaff->id : $client->id,
                        'message' => fake()->paragraph(2),
                        'is_internal' => $isStaff && rand(0, 1),
                        'created_at' => $ticket->created_at->addHours($r * 3),
                    ]);
                }
            }

            $this->command->info("✓ Created {$ticketCount} tickets for {$company->name}");
        }
    }
}
