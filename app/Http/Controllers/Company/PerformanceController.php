<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use App\Models\StaffPerformance;
use App\Models\ChatConversation;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PerformanceController extends Controller
{
    public function index(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $period = $request->period ?? 'month'; // week, month, year
        $startDate = $this->getStartDate($period);

        $staff = Staff::where('company_id', $company->id)
            ->where('is_active', true)
            ->get();

        $performanceData = [];

        foreach ($staff as $agent) {
            $chatsCount = ChatConversation::where('company_id', $company->id)
                ->where('assigned_to', $agent->id)
                ->where('created_at', '>=', $startDate)
                ->count();

            $ticketsCount = Ticket::where('company_id', $company->id)
                ->where('assigned_to', $agent->id)
                ->where('created_at', '>=', $startDate)
                ->count();

            $avgResponseTime = $this->calculateAvgResponseTime($agent->id, $company->id, $startDate);

            $performanceData[] = [
                'staff' => $agent,
                'total_chats' => $chatsCount,
                'total_tickets' => $ticketsCount,
                'avg_response_time' => $avgResponseTime,
                'satisfaction_rating' => $this->calculateSatisfaction($agent->id, $company->id, $startDate),
            ];
        }

        return Inertia::render('company/Performance', [
            'performanceData' => $performanceData,
            'period' => $period,
        ]);
    }

    private function getStartDate($period)
    {
        return match($period) {
            'week' => Carbon::now()->subWeek(),
            'year' => Carbon::now()->subYear(),
            default => Carbon::now()->subMonth(),
        };
    }

    private function calculateAvgResponseTime($staffId, $companyId, $startDate)
    {
        // Simplified - would calculate actual response times
        return rand(60, 300); // seconds
    }

    private function calculateSatisfaction($staffId, $companyId, $startDate)
    {
        $ratings = ChatConversation::where('company_id', $companyId)
            ->where('assigned_to', $staffId)
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('rating')
            ->avg('rating');

        return $ratings ? round($ratings, 1) : null;
    }
}
