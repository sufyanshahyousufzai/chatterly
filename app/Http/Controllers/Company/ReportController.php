<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\ChatConversation;
use App\Models\Ticket;
use App\Models\Client;
use App\Models\Staff;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $company = auth()->guard('company')->user()->company;
        $period = $request->period ?? 'month';
        $startDate = $this->getStartDate($period);

        $reportTypes = [
            [
                'id' => 'conversations',
                'name' => 'Conversation Report',
                'description' => 'Detailed analytics on chat conversations',
                'category' => 'Communication',
            ],
            [
                'id' => 'tickets',
                'name' => 'Ticket Report',
                'description' => 'Ticket resolution and performance metrics',
                'category' => 'Support',
            ],
            [
                'id' => 'staff',
                'name' => 'Staff Performance Report',
                'description' => 'Individual staff member performance',
                'category' => 'Team',
            ],
            [
                'id' => 'client',
                'name' => 'Client Activity Report',
                'description' => 'Client engagement and satisfaction',
                'category' => 'Clients',
            ],
            [
                'id' => 'satisfaction',
                'name' => 'Customer Satisfaction Report',
                'description' => 'CSAT, NPS, and feedback analytics',
                'category' => 'Quality',
            ],
        ];

        return Inertia::render('company/Reports', [
            'reportTypes' => $reportTypes,
            'period' => $period,
        ]);
    }

    public function generate(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'report_type' => 'required|in:conversations,tickets,staff,client,satisfaction',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'format' => 'required|in:pdf,csv,xlsx',
        ]);

        $data = $this->generateReportData(
            $company->id,
            $request->report_type,
            $request->start_date,
            $request->end_date
        );

        // Return data for download
        return response()->json([
            'report' => $data,
            'download_url' => '/api/reports/download/' . $data['report_id'],
        ]);
    }

    public function conversationReport(Request $request)
    {
        $company = auth()->guard('company')->user()->company;
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        $conversations = ChatConversation::where('company_id', $company->id)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->with(['client', 'staff', 'messages'])
            ->get();

        $data = [
            'total_conversations' => $conversations->count(),
            'avg_response_time' => $this->calculateAvgResponseTime($conversations),
            'avg_resolution_time' => $this->calculateAvgResolutionTime($conversations),
            'conversations_by_status' => $conversations->groupBy('status')->map->count(),
            'conversations_by_day' => $this->groupByDay($conversations, $startDate, $endDate),
        ];

        return Inertia::render('company/reports/ConversationReport', [
            'data' => $data,
            'conversations' => $conversations,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
        ]);
    }

    public function ticketReport(Request $request)
    {
        $company = auth()->guard('company')->user()->company;
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        $tickets = Ticket::where('company_id', $company->id)
            ->whereBetween('created_at', [$startDate, $endDate])
            ->with(['client', 'assignedStaff'])
            ->get();

        $data = [
            'total_tickets' => $tickets->count(),
            'resolved_tickets' => $tickets->where('status', 'resolved')->count(),
            'avg_resolution_time' => $this->calculateTicketAvgResolutionTime($tickets),
            'tickets_by_priority' => $tickets->groupBy('priority')->map->count(),
            'tickets_by_status' => $tickets->groupBy('status')->map->count(),
            'tickets_by_day' => $this->groupByDay($tickets, $startDate, $endDate),
        ];

        return Inertia::render('company/reports/TicketReport', [
            'data' => $data,
            'tickets' => $tickets,
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
        ]);
    }

    public function export(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'export_type' => 'required|in:conversations,tickets,clients,staff,all',
            'format' => 'required|in:csv,xlsx,json',
        ]);

        $data = $this->getExportData($company->id, $request->export_type);

        // Generate file based on format
        $filename = $request->export_type . '_' . now()->format('Y-m-d_His') . '.' . $request->format;

        // In production, you would generate the actual file here
        // For now, return the data structure

        return response()->json([
            'success' => true,
            'filename' => $filename,
            'download_url' => '/exports/' . $filename,
            'record_count' => count($data),
        ]);
    }

    private function generateReportData($companyId, $type, $startDate, $endDate)
    {
        $reportId = uniqid('report_');

        switch ($type) {
            case 'conversations':
                $data = ChatConversation::where('company_id', $companyId)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->get();
                break;
            case 'tickets':
                $data = Ticket::where('company_id', $companyId)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->get();
                break;
            case 'staff':
                $data = Staff::where('company_id', $companyId)->get();
                break;
            case 'client':
                $data = Client::where('company_id', $companyId)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->get();
                break;
            case 'satisfaction':
                $data = Feedback::where('company_id', $companyId)
                    ->whereBetween('created_at', [$startDate, $endDate])
                    ->get();
                break;
            default:
                $data = [];
        }

        return [
            'report_id' => $reportId,
            'type' => $type,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'record_count' => count($data),
            'generated_at' => now()->toDateTimeString(),
        ];
    }

    private function getExportData($companyId, $exportType)
    {
        switch ($exportType) {
            case 'conversations':
                return ChatConversation::where('company_id', $companyId)
                    ->with(['client', 'staff', 'messages'])
                    ->get()
                    ->toArray();
            case 'tickets':
                return Ticket::where('company_id', $companyId)
                    ->with(['client', 'assignedStaff', 'replies'])
                    ->get()
                    ->toArray();
            case 'clients':
                return Client::where('company_id', $companyId)->get()->toArray();
            case 'staff':
                return Staff::where('company_id', $companyId)->get()->toArray();
            case 'all':
                return [
                    'conversations' => ChatConversation::where('company_id', $companyId)->count(),
                    'tickets' => Ticket::where('company_id', $companyId)->count(),
                    'clients' => Client::where('company_id', $companyId)->count(),
                    'staff' => Staff::where('company_id', $companyId)->count(),
                ];
            default:
                return [];
        }
    }

    private function calculateAvgResponseTime($conversations)
    {
        // Placeholder calculation
        return '5 minutes';
    }

    private function calculateAvgResolutionTime($conversations)
    {
        // Placeholder calculation
        return '15 minutes';
    }

    private function calculateTicketAvgResolutionTime($tickets)
    {
        // Placeholder calculation
        return '2 hours';
    }

    private function groupByDay($collection, $startDate, $endDate)
    {
        $days = [];
        $current = $startDate->copy();

        while ($current <= $endDate) {
            $count = $collection->filter(function ($item) use ($current) {
                return Carbon::parse($item->created_at)->isSameDay($current);
            })->count();

            $days[$current->format('Y-m-d')] = $count;
            $current->addDay();
        }

        return $days;
    }

    private function getStartDate($period)
    {
        switch ($period) {
            case 'week':
                return Carbon::now()->subWeek();
            case 'month':
                return Carbon::now()->subMonth();
            case 'quarter':
                return Carbon::now()->subQuarter();
            case 'year':
                return Carbon::now()->subYear();
            default:
                return Carbon::now()->subMonth();
        }
    }
}
