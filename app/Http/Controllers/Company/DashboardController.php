<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use App\Models\ChatMessage;
use App\Models\Client;
use App\Models\Staff;
use App\Models\Ticket;
use App\Models\Visitor;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;
        $companyId = $company->id;

        // Get statistics
        $stats = $this->getStats($companyId);
        $recentConversations = $this->getRecentConversations($companyId);
        $activeVisitors = $this->getActiveVisitors($companyId);
        $teamMembers = $this->getTeamMembers($companyId);

        return Inertia::render('company/Dashboard', [
            'company' => $company,
            'stats' => $stats,
            'recentConversations' => $recentConversations,
            'activeVisitors' => $activeVisitors,
            'teamMembers' => $teamMembers,
        ]);
    }

    private function getStats($companyId)
    {
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        return [
            'total_conversations' => ChatConversation::where('company_id', $companyId)->count(),
            'conversations_today' => ChatConversation::where('company_id', $companyId)
                ->whereDate('created_at', $today)
                ->count(),
            'active_visitors' => Visitor::where('company_id', $companyId)
                ->where('last_activity_at', '>', Carbon::now()->subMinutes(5))
                ->count(),
            'total_clients' => Client::where('company_id', $companyId)->count(),
            'total_staff' => Staff::where('company_id', $companyId)->count(),
            'staff_online' => Staff::where('company_id', $companyId)
                ->where('online_status', 'online')
                ->count(),
            'open_tickets' => Ticket::where('company_id', $companyId)
                ->whereIn('status', ['open', 'in_progress'])
                ->count(),
            'avg_response_time' => $this->getAverageResponseTime($companyId),
            'satisfaction_rate' => $this->getSatisfactionRate($companyId),
            'messages_today' => ChatMessage::whereHas('conversation', function ($query) use ($companyId) {
                $query->where('company_id', $companyId);
            })->whereDate('created_at', $today)->count(),
        ];
    }

    private function getRecentConversations($companyId)
    {
        return ChatConversation::with(['visitor', 'client', 'assignedTo'])
            ->where('company_id', $companyId)
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($conversation) {
                return [
                    'id' => $conversation->id,
                    'status' => $conversation->status,
                    'created_at' => $conversation->created_at,
                    'visitor_name' => $conversation->visitor?->name ?? $conversation->client?->name ?? 'Unknown',
                    'assigned_to' => $conversation->assignedTo?->name,
                ];
            });
    }

    private function getActiveVisitors($companyId)
    {
        return Visitor::where('company_id', $companyId)
            ->where('last_activity_at', '>', Carbon::now()->subMinutes(5))
            ->latest('last_activity_at')
            ->limit(10)
            ->get()
            ->map(function ($visitor) {
                return [
                    'id' => $visitor->id,
                    'visitor_id' => $visitor->visitor_id,
                    'name' => $visitor->name ?? 'Anonymous',
                    'current_page' => $visitor->current_page,
                    'city' => $visitor->city,
                    'country' => $visitor->country,
                    'device' => $visitor->device,
                    'last_activity_at' => $visitor->last_activity_at,
                ];
            });
    }

    private function getTeamMembers($companyId)
    {
        return Staff::where('company_id', $companyId)
            ->where('is_active', true)
            ->get()
            ->map(function ($staff) {
                return [
                    'id' => $staff->id,
                    'staff_id' => $staff->staff_id,
                    'name' => $staff->name,
                    'email' => $staff->email,
                    'online_status' => $staff->online_status,
                    'active_chats' => $staff->active_chats ?? 0,
                    'max_concurrent_chats' => $staff->max_concurrent_chats,
                ];
            });
    }

    private function getAverageResponseTime($companyId)
    {
        // Calculate average response time (simplified version)
        // In a real implementation, you'd track first response times
        $conversations = ChatConversation::where('company_id', $companyId)
            ->whereNotNull('first_response_at')
            ->get();

        if ($conversations->isEmpty()) {
            return null;
        }

        $totalSeconds = $conversations->sum(function ($conversation) {
            return $conversation->created_at->diffInSeconds($conversation->first_response_at);
        });

        $avgSeconds = $totalSeconds / $conversations->count();

        if ($avgSeconds < 60) {
            return round($avgSeconds) . 's';
        } elseif ($avgSeconds < 3600) {
            return round($avgSeconds / 60) . 'm';
        } else {
            return round($avgSeconds / 3600, 1) . 'h';
        }
    }

    private function getSatisfactionRate($companyId)
    {
        // Calculate satisfaction rate from ratings
        $rated = ChatConversation::where('company_id', $companyId)
            ->whereNotNull('rating')
            ->get();

        if ($rated->isEmpty()) {
            return null;
        }

        $avgRating = $rated->avg('rating');
        return round(($avgRating / 5) * 100) . '%';
    }
}
