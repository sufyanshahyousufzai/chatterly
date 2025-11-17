<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\AiAutomation;
use App\Models\ChatMessage;
use App\Models\ChatConversation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AiController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;

        $automations = AiAutomation::where('company_id', $company->id)->get();

        // AI Usage Statistics
        $stats = [
            'smart_replies_used' => AiAutomation::where('company_id', $company->id)
                ->where('automation_type', 'smart_reply')
                ->sum('usage_count'),
            'sentiment_analyzed' => AiAutomation::where('company_id', $company->id)
                ->where('automation_type', 'sentiment')
                ->sum('usage_count'),
            'summaries_generated' => AiAutomation::where('company_id', $company->id)
                ->where('automation_type', 'summary')
                ->sum('usage_count'),
            'auto_translations' => AiAutomation::where('company_id', $company->id)
                ->where('automation_type', 'translation')
                ->sum('usage_count'),
        ];

        return Inertia::render('company/AiAutomation', [
            'automations' => $automations,
            'stats' => $stats,
        ]);
    }

    public function generateSmartReply(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'conversation_id' => 'required|exists:chat_conversations,id',
            'context' => 'nullable|string',
        ]);

        // Get conversation context
        $conversation = ChatConversation::where('company_id', $company->id)
            ->findOrFail($request->conversation_id);

        $recentMessages = ChatMessage::where('conversation_id', $conversation->id)
            ->latest()
            ->limit(10)
            ->get()
            ->reverse();

        // Generate smart replies using AI (placeholder)
        $smartReplies = $this->generateRepliesWithAI($recentMessages, $request->context);

        // Log usage
        $this->logAiUsage($company->id, 'smart_reply');

        return response()->json([
            'smart_replies' => $smartReplies,
        ]);
    }

    public function analyzeSentiment(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'conversation_id' => 'required|exists:chat_conversations,id',
        ]);

        $conversation = ChatConversation::where('company_id', $company->id)
            ->findOrFail($request->conversation_id);

        $messages = ChatMessage::where('conversation_id', $conversation->id)->get();

        // Analyze sentiment using AI (placeholder)
        $sentiment = $this->analyzeSentimentWithAI($messages);

        // Log usage
        $this->logAiUsage($company->id, 'sentiment');

        return response()->json([
            'sentiment' => $sentiment,
        ]);
    }

    public function generateSummary(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'conversation_id' => 'required|exists:chat_conversations,id',
        ]);

        $conversation = ChatConversation::where('company_id', $company->id)
            ->findOrFail($request->conversation_id);

        $messages = ChatMessage::where('conversation_id', $conversation->id)
            ->orderBy('created_at')
            ->get();

        // Generate summary using AI (placeholder)
        $summary = $this->generateSummaryWithAI($messages);

        // Log usage
        $this->logAiUsage($company->id, 'summary');

        return response()->json([
            'summary' => $summary,
        ]);
    }

    public function updateAutomation(Request $request, $id)
    {
        $company = auth()->guard('company')->user()->company;
        $automation = AiAutomation::where('company_id', $company->id)->findOrFail($id);

        $request->validate([
            'is_active' => 'required|boolean',
            'settings' => 'nullable|array',
        ]);

        $automation->update([
            'is_active' => $request->is_active,
            'settings' => $request->settings ?? $automation->settings,
        ]);

        return redirect()->back()->with('success', 'Automation updated successfully');
    }

    private function generateRepliesWithAI($messages, $context = null)
    {
        // Placeholder for AI integration (OpenAI, Claude, etc.)
        // In production, this would call an AI API

        return [
            "Thank you for reaching out! I'd be happy to help you with that.",
            "I understand your concern. Let me look into this for you right away.",
            "That's a great question! Here's what I can tell you...",
        ];
    }

    private function analyzeSentimentWithAI($messages)
    {
        // Placeholder for sentiment analysis
        // In production, this would use NLP models

        $sentiments = ['positive', 'neutral', 'negative'];
        $randomSentiment = $sentiments[array_rand($sentiments)];

        return [
            'overall' => $randomSentiment,
            'score' => rand(60, 95) / 100,
            'breakdown' => [
                'positive' => rand(40, 80),
                'neutral' => rand(10, 30),
                'negative' => rand(5, 20),
            ],
        ];
    }

    private function generateSummaryWithAI($messages)
    {
        // Placeholder for conversation summarization
        // In production, this would use AI summarization models

        $messageCount = $messages->count();

        return [
            'summary' => "Customer inquiry regarding product features and pricing. Agent provided detailed information and answered all questions. Conversation ended positively with customer expressing satisfaction.",
            'key_points' => [
                'Customer asked about premium plan features',
                'Agent explained pricing tiers and benefits',
                'Customer concerns were addressed',
                'Follow-up scheduled for next week',
            ],
            'message_count' => $messageCount,
            'duration' => '12 minutes',
        ];
    }

    private function logAiUsage($companyId, $type)
    {
        $automation = AiAutomation::firstOrCreate(
            [
                'company_id' => $companyId,
                'automation_type' => $type,
            ],
            [
                'is_active' => true,
                'usage_count' => 0,
                'settings' => [],
            ]
        );

        $automation->increment('usage_count');
    }
}
