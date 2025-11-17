<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $logs = ActivityLog::where('company_id', $company->id)
            ->with('causer')
            ->latest()
            ->paginate(50);

        return Inertia::render('company/ActivityLogs', [
            'logs' => $logs,
        ]);
    }
}
