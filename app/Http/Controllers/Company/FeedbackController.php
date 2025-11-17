<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\ChatConversation;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class FeedbackController extends Controller
{
    public function index(Request $request)
    {
        $company = auth()->guard('company')->user()->company;
        $period = $request->period ?? 'month';

        $startDate = $this->getStartDate($period);

        // Get all feedback
        $feedbacks = Feedback::where('company_id', $company->id)
            ->with(['feedbackable', 'client'])
            ->when($request->type, function ($query, $type) {
                $query->where('feedback_type', $type);
            })
            ->when($request->rating, function ($query, $rating) {
                $query->where('rating', $rating);
            })
            ->where('created_at', '>=', $startDate)
            ->latest()
            ->paginate(30);

        // Calculate metrics
        $csat = $this->calculateCSAT($company->id, $startDate);
        $nps = $this->calculateNPS($company->id, $startDate);
        $avgRating = $this->calculateAvgRating($company->id, $startDate);
        $totalFeedbacks = Feedback::where('company_id', $company->id)
            ->where('created_at', '>=', $startDate)
            ->count();

        // Rating distribution
        $ratingDistribution = Feedback::where('company_id', $company->id)
            ->where('created_at', '>=', $startDate)
            ->selectRaw('rating, COUNT(*) as count')
            ->groupBy('rating')
            ->pluck('count', 'rating')
            ->toArray();

        return Inertia::render('company/Feedback', [
            'feedbacks' => $feedbacks,
            'metrics' => [
                'csat' => $csat,
                'nps' => $nps,
                'avg_rating' => $avgRating,
                'total_feedbacks' => $totalFeedbacks,
                'rating_distribution' => $ratingDistribution,
            ],
            'period' => $period,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'feedbackable_type' => 'required|in:chat,ticket',
            'feedbackable_id' => 'required|integer',
            'feedback_type' => 'required|in:csat,nps,rating',
            'rating' => 'required|integer|min:1|max:10',
            'comment' => 'nullable|string|max:1000',
        ]);

        // Get client from guard or session
        $client = auth()->guard('client')->user();

        Feedback::create([
            'company_id' => $request->company_id,
            'client_id' => $client ? $client->id : null,
            'feedbackable_type' => $request->feedbackable_type,
            'feedbackable_id' => $request->feedbackable_id,
            'feedback_type' => $request->feedback_type,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'message' => 'Thank you for your feedback!',
        ]);
    }

    private function calculateCSAT($companyId, $startDate)
    {
        $total = Feedback::where('company_id', $companyId)
            ->where('feedback_type', 'csat')
            ->where('created_at', '>=', $startDate)
            ->count();

        if ($total === 0) {
            return 0;
        }

        // CSAT: % of ratings 4-5 (satisfied)
        $satisfied = Feedback::where('company_id', $companyId)
            ->where('feedback_type', 'csat')
            ->where('created_at', '>=', $startDate)
            ->whereIn('rating', [4, 5])
            ->count();

        return round(($satisfied / $total) * 100, 1);
    }

    private function calculateNPS($companyId, $startDate)
    {
        $total = Feedback::where('company_id', $companyId)
            ->where('feedback_type', 'nps')
            ->where('created_at', '>=', $startDate)
            ->count();

        if ($total === 0) {
            return 0;
        }

        // NPS: % promoters (9-10) - % detractors (0-6)
        $promoters = Feedback::where('company_id', $companyId)
            ->where('feedback_type', 'nps')
            ->where('created_at', '>=', $startDate)
            ->whereIn('rating', [9, 10])
            ->count();

        $detractors = Feedback::where('company_id', $companyId)
            ->where('feedback_type', 'nps')
            ->where('created_at', '>=', $startDate)
            ->where('rating', '<=', 6)
            ->count();

        $nps = (($promoters - $detractors) / $total) * 100;

        return round($nps, 1);
    }

    private function calculateAvgRating($companyId, $startDate)
    {
        $avg = Feedback::where('company_id', $companyId)
            ->where('created_at', '>=', $startDate)
            ->avg('rating');

        return round($avg ?? 0, 1);
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
