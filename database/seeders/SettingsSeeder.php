<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\WidgetSetting;
use App\Models\ChatbotTrigger;
use App\Models\ChatbotResponse;
use App\Models\KnowledgeBaseCategory;
use App\Models\KnowledgeBaseArticle;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $companies = Company::all();

        foreach ($companies as $company) {
            // Widget Settings
            WidgetSetting::create([
                'company_id' => $company->id,
                'widget_position' => 'bottom-right',
                'primary_color' => '#E11D48',
                'secondary_color' => '#14B8A6',
                'welcome_message' => 'Hi! How can we help you today?',
                'offline_message' => 'We\'re currently offline. Please leave a message.',
                'show_agent_avatar' => true,
                'enable_file_upload' => true,
                'enable_emoji' => true,
                'custom_css' => '',
            ]);

            // Chatbot Triggers & Responses
            $triggers = [
                [
                    'trigger_type' => 'greeting',
                    'trigger_value' => 'hello,hi,hey',
                    'response' => 'Hello! Welcome to ' . $company->name . '. How can I assist you today?',
                ],
                [
                    'trigger_type' => 'keyword',
                    'trigger_value' => 'pricing,price,cost',
                    'response' => 'You can view our pricing plans at ' . $company->website . '/pricing',
                ],
                [
                    'trigger_type' => 'keyword',
                    'trigger_value' => 'support,help',
                    'response' => 'I\'m here to help! You can also reach our support team at ' . $company->email,
                ],
                [
                    'trigger_type' => 'keyword',
                    'trigger_value' => 'hours,availability',
                    'response' => 'Our support team is available Monday-Friday, 9 AM - 5 PM EST.',
                ],
            ];

            foreach ($triggers as $triggerData) {
                $trigger = ChatbotTrigger::create([
                    'company_id' => $company->id,
                    'trigger_type' => $triggerData['trigger_type'],
                    'trigger_value' => $triggerData['trigger_value'],
                    'is_active' => true,
                ]);

                ChatbotResponse::create([
                    'trigger_id' => $trigger->id,
                    'response_text' => $triggerData['response'],
                    'response_type' => 'text',
                ]);
            }

            // Knowledge Base
            $categories = [
                ['name' => 'Getting Started', 'slug' => 'getting-started'],
                ['name' => 'Account Management', 'slug' => 'account-management'],
                ['name' => 'Billing & Pricing', 'slug' => 'billing-pricing'],
                ['name' => 'Technical Support', 'slug' => 'technical-support'],
                ['name' => 'API Documentation', 'slug' => 'api-documentation'],
            ];

            foreach ($categories as $categoryData) {
                $category = KnowledgeBaseCategory::create([
                    'company_id' => $company->id,
                    'name' => $categoryData['name'],
                    'slug' => $categoryData['slug'],
                    'description' => 'Articles about ' . strtolower($categoryData['name']),
                ]);

                // Add 3-5 articles per category
                $articleCount = rand(3, 5);
                for ($i = 1; $i <= $articleCount; $i++) {
                    KnowledgeBaseArticle::create([
                        'company_id' => $company->id,
                        'category_id' => $category->id,
                        'title' => fake()->sentence(5),
                        'slug' => fake()->slug(3),
                        'content' => fake()->paragraphs(5, true),
                        'is_published' => true,
                        'views' => rand(0, 500),
                    ]);
                }
            }

            $this->command->info("✓ Created settings and content for {$company->name}");
        }
    }
}
