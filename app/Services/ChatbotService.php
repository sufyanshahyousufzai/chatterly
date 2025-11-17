<?php

namespace App\Services;

use App\Models\ChatbotTrigger;
use App\Models\ChatbotResponse;
use App\Models\ChatMessage;
use App\Models\ChatConversation;
use App\Events\MessageSent;

class ChatbotService
{
    /**
     * Process incoming message and generate automated response if applicable
     */
    public function processMessage(ChatMessage $message, ChatConversation $conversation): ?ChatMessage
    {
        // Only process visitor messages
        if (!str_contains($message->sender_type, 'Visitor')) {
            return null;
        }

        $companyId = $conversation->company_id;
        $messageText = $message->message;

        // Check advanced triggers first
        $trigger = $this->findMatchingTrigger($companyId, $messageText);
        
        if ($trigger) {
            return $this->generateTriggerResponse($trigger, $conversation);
        }

        // Fall back to simple keyword responses
        $response = $this->findMatchingResponse($companyId, $messageText);
        
        if ($response) {
            return $this->generateSimpleResponse($response, $conversation);
        }

        return null;
    }

    /**
     * Find matching chatbot trigger
     */
    protected function findMatchingTrigger(int $companyId, string $message): ?ChatbotTrigger
    {
        return ChatbotTrigger::where('company_id', $companyId)
            ->where('trigger_type', 'keyword')
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->first(function ($trigger) use ($message) {
                return $trigger->matchesMessage($message);
            });
    }

    /**
     * Find matching simple response
     */
    protected function findMatchingResponse(int $companyId, string $message): ?ChatbotResponse
    {
        return ChatbotResponse::where('company_id', $companyId)
            ->where('is_active', true)
            ->get()
            ->first(function ($response) use ($message) {
                return $response->matches($message);
            });
    }

    /**
     * Generate response from trigger
     */
    protected function generateTriggerResponse(ChatbotTrigger $trigger, ChatConversation $conversation): ?ChatMessage
    {
        if (!$trigger->response_message) {
            return null;
        }

        $botMessage = ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender_type' => 'system',
            'sender_id' => null,
            'message' => $trigger->response_message,
            'message_type' => 'text',
        ]);

        // Broadcast the bot message
        broadcast(new MessageSent($botMessage));

        return $botMessage;
    }

    /**
     * Generate simple keyword response
     */
    protected function generateSimpleResponse(ChatbotResponse $response, ChatConversation $conversation): ?ChatMessage
    {
        $botMessage = ChatMessage::create([
            'conversation_id' => $conversation->id,
            'sender_type' => 'system',
            'sender_id' => null,
            'message' => $response->response,
            'message_type' => 'text',
        ]);

        // Broadcast the bot message
        broadcast(new MessageSent($botMessage));

        return $botMessage;
    }

    /**
     * Get greeting trigger for a company
     */
    public function getGreetingTrigger(int $companyId): ?ChatbotTrigger
    {
        return ChatbotTrigger::where('company_id', $companyId)
            ->where('trigger_type', 'greeting')
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->first();
    }

    /**
     * Get time-based triggers for a visitor
     */
    public function getTimeBasedTriggers(int $companyId, int $timeOnSite): array
    {
        return ChatbotTrigger::where('company_id', $companyId)
            ->where('trigger_type', 'time_on_site')
            ->where('time_seconds', '<=', $timeOnSite)
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->toArray();
    }

    /**
     * Get URL-based triggers
     */
    public function getUrlTriggers(int $companyId, string $url): ?ChatbotTrigger
    {
        return ChatbotTrigger::where('company_id', $companyId)
            ->where('trigger_type', 'url')
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->first(function ($trigger) use ($url) {
                return $trigger->matchesUrl($url);
            });
    }
}
