<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Staff;
use App\Models\Client;
use App\Models\ChatConversation;
use App\Models\Ticket;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_companies' => Company::count(),
            'active_companies' => Company::where('is_active', true)->count(),
            'trial_companies' => Company::where('subscription_status', 'trial')->count(),
            'paid_companies' => Company::where('subscription_status', 'active')->count(),
            'total_users' => Staff::count() + Client::count(),
            'total_conversations' => ChatConversation::count(),
            'total_tickets' => Ticket::count(),
            'monthly_revenue' => $this->calculateMonthlyRevenue(),
        ];

        $recentCompanies = Company::with('subscriptionPlan')->latest()->limit(10)->get();

        return Inertia::render('superadmin/Dashboard', [
            'stats' => $stats,
            'recentCompanies' => $recentCompanies,
        ]);
    }

    private function calculateMonthlyRevenue()
    {
        $activeCompanies = Company::where('subscription_status', 'active')
            ->with('subscriptionPlan')->get();
        $revenue = 0;
        foreach ($activeCompanies as $company) {
            if ($company->subscriptionPlan) {
                $revenue += $company->subscriptionPlan->price_monthly;
            }
        }
        return $revenue;
    }
}
