<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index() {
        $company = auth()->guard('company')->user()->company;
        $stats = [
            'total_chats' => $company->chatConversations()->count(),
            'total_tickets' => $company->tickets()->count(),
            'total_clients' => $company->clients()->count(),
            'total_staff' => $company->staff()->count(),
        ];
        return Inertia::render('company/Analytics', ['stats' => $stats]);
    }
}
