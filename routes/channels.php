<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\CompanyUser;
use App\Models\Staff;
use App\Models\Client;
use App\Models\ChatConversation;

// Company User Personal Channel
Broadcast::channel('company-user.{id}', function ($user, $id) {
    if ($user instanceof CompanyUser) {
        return (int) $user->id === (int) $id;
    }
    return false;
});

// Company-wide Channel (for all staff/owners in a company)
Broadcast::channel('company.{companyId}', function ($user, $companyId) {
    if ($user instanceof CompanyUser || $user instanceof Staff) {
        return (int) $user->company_id === (int) $companyId;
    }
    return false;
});

// Staff Personal Channel
Broadcast::channel('staff.{id}', function ($user, $id) {
    if ($user instanceof Staff) {
        return (int) $user->id === (int) $id;
    }
    return false;
});

// Client Personal Channel
Broadcast::channel('client.{id}', function ($user, $id) {
    if ($user instanceof Client) {
        return (int) $user->id === (int) $id;
    }
    return false;
});

// Chat Conversation Channel (accessible by participants)
Broadcast::channel('chat.{conversationId}', function ($user, $conversationId) {
    $conversation = ChatConversation::find($conversationId);

    if (!$conversation) {
        return false;
    }

    // Allow company staff/owners
    if (($user instanceof CompanyUser || $user instanceof Staff) && $user->company_id === $conversation->company_id) {
        return ['id' => $user->id, 'name' => $user->name, 'type' => get_class($user)];
    }

    // Allow visitor or client who owns the conversation
    if ($user instanceof Client && $conversation->client_id === $user->id) {
        return ['id' => $user->id, 'name' => $user->name, 'type' => 'client'];
    }

    return false;
});

// Visitor Tracking Channel (company-specific)
Broadcast::channel('visitors.{companyId}', function ($user, $companyId) {
    if (($user instanceof CompanyUser || $user instanceof Staff) && $user->company_id === (int) $companyId) {
        return true;
    }
    return false;
});

// Active Chats Channel (for staff to see all active chats)
Broadcast::channel('active-chats.{companyId}', function ($user, $companyId) {
    if (($user instanceof CompanyUser || $user instanceof Staff) && $user->company_id === (int) $companyId) {
        return true;
    }
    return false;
});
