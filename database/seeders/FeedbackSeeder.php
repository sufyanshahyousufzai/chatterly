<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\Client;
use App\Models\ChatConversation;
use App\Models\Ticket;
use App\Models\Feedback;
use Carbon\Carbon;

class FeedbackSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        $comments = [
            'Great service, very helpful!',
            'Quick response time, thanks!',
            'Exactly what I needed',
            'The support team was amazing',
            'Could be better, but acceptable',
            'Not satisfied with the response time',
            'Outstanding customer service!',
            'Very professional and knowledgeable',
            'Issue was resolved quickly',
            'Happy with the outcome',
        ];

        foreach ($companies as $company) {
            $clients = Client::where('company_id', $company->id)->get();
            $conversations = ChatConversation::where('company_id', $company->id)
                ->where('status', 'closed')
                ->get();
            $tickets = Ticket::where('company_id', $company->id)
                ->whereIn('status', ['resolved', 'closed'])
                ->get();

            if ($clients->isEmpty()) {
                continue;
            }

            // Create CSAT feedback (5-point scale converted to 10)
            foreach ($conversations->take(rand(10, 20)) as $conversation) {
                $rating = rand(1, 5); // 1-5 for CSAT
                Feedback::create([
                    'company_id' => $company->id,
                    'client_id' => $conversation->client_id,
                    'feedbackable_type' => 'chat',
                    'feedbackable_id' => $conversation->id,
                    'feedback_type' => 'csat',
                    'rating' => $rating * 2, // Convert to 10-point scale
                    'comment' => rand(0, 1) ? $comments[array_rand($comments)] : null,
                    'created_at' => Carbon::now()->subDays(rand(0, 30)),
                ]);
            }

            // Create NPS feedback (0-10 scale)
            $npsCount = rand(15, 30);
            for ($i = 0; $i < $npsCount; $i++) {
                $client = $clients->random();
                $rating = rand(0, 10); // 0-10 for NPS

                Feedback::create([
                    'company_id' => $company->id,
                    'client_id' => $client->id,
                    'feedbackable_type' => null,
                    'feedbackable_id' => null,
                    'feedback_type' => 'nps',
                    'rating' => $rating,
                    'comment' => rand(0, 1) ? $comments[array_rand($comments)] : null,
                    'created_at' => Carbon::now()->subDays(rand(0, 30)),
                ]);
            }

            // Create Rating feedback for tickets
            foreach ($tickets->take(rand(10, 20)) as $ticket) {
                $rating = rand(6, 10); // Generally higher for tickets
                Feedback::create([
                    'company_id' => $company->id,
                    'client_id' => $ticket->client_id,
                    'feedbackable_type' => 'ticket',
                    'feedbackable_id' => $ticket->id,
                    'feedback_type' => 'rating',
                    'rating' => $rating,
                    'comment' => rand(0, 1) ? $comments[array_rand($comments)] : null,
                    'created_at' => Carbon::now()->subDays(rand(0, 30)),
                ]);
            }

            $totalFeedback = Feedback::where('company_id', $company->id)->count();
            $this->command->info("✓ Created {$totalFeedback} feedback entries for {$company->name}");
        }
    }
}
