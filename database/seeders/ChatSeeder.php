<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Staff;
use App\Models\Client;
use App\Models\ChatConversation;
use App\Models\ChatMessage;
use Carbon\Carbon;

class ChatSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        $sampleMessages = [
            'client' => [
                'Hi, I need help with my account',
                'Can you help me reset my password?',
                'I have a question about billing',
                'How do I upgrade my plan?',
                'I\'m experiencing an issue with your service',
                'Thanks for your help!',
                'That worked perfectly, thank you!',
            ],
            'staff' => [
                'Hello! How can I assist you today?',
                'I\'d be happy to help you with that',
                'Let me look into that for you',
                'I\'ve reset your password. Please check your email',
                'You can upgrade your plan from the billing page',
                'Is there anything else I can help you with?',
                'You\'re welcome! Feel free to reach out if you need anything else',
            ],
        ];

        $statuses = ['active', 'waiting', 'closed'];

        foreach ($companies as $company) {
            $staff = Staff::where('company_id', $company->id)->get();
            $clients = Client::where('company_id', $company->id)->get();

            if ($staff->isEmpty() || $clients->isEmpty()) {
                continue;
            }

            $conversationCount = rand(15, 30);

            for ($i = 0; $i < $conversationCount; $i++) {
                $client = $clients->random();
                $assignedStaff = $staff->random();
                $status = $statuses[array_rand($statuses)];

                $conversation = ChatConversation::create([
                    'company_id' => $company->id,
                    'client_id' => $client->id,
                    'assigned_to' => rand(0, 1) ? $assignedStaff->id : null,
                    'status' => $status,
                    'started_at' => Carbon::now()->subDays(rand(0, 30)),
                    'ended_at' => $status === 'closed' ? Carbon::now()->subDays(rand(0, 5)) : null,
                ]);

                // Add messages
                $messageCount = rand(3, 10);
                $currentTime = $conversation->started_at;

                for ($m = 0; $m < $messageCount; $m++) {
                    $isClient = $m % 2 === 0;
                    $messages = $isClient ? $sampleMessages['client'] : $sampleMessages['staff'];

                    ChatMessage::create([
                        'conversation_id' => $conversation->id,
                        'sender_type' => $isClient ? 'client' : 'staff',
                        'sender_id' => $isClient ? $client->id : $assignedStaff->id,
                        'message' => $messages[array_rand($messages)],
                        'is_read' => $status === 'closed' || rand(0, 1),
                        'created_at' => $currentTime,
                        'updated_at' => $currentTime,
                    ]);

                    $currentTime = $currentTime->addMinutes(rand(1, 15));
                }
            }

            $this->command->info("✓ Created {$conversationCount} chat conversations for {$company->name}");
        }
    }
}
