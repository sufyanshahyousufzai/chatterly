<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StaffMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->guard('staff')->check()) {
            return redirect()->route('staff.login');
        }

        $staff = auth()->guard('staff')->user();

        if (!$staff->is_active) {
            auth()->guard('staff')->logout();
            return redirect()->route('staff.login')->with('error', 'Your account has been deactivated.');
        }

        if (!$staff->company->is_active) {
            auth()->guard('staff')->logout();
            return redirect()->route('staff.login')->with('error', 'Your company account is inactive.');
        }

        // Check company subscription
        if (!in_array($staff->company->subscription_status, ['trial', 'active'])) {
            auth()->guard('staff')->logout();
            return redirect()->route('staff.login')->with('error', 'Company subscription has expired.');
        }

        return $next($request);
    }
}