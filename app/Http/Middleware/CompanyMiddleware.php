<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompanyMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->guard('company')->check()) {
            return redirect()->route('company.login');
        }

        $user = auth()->guard('company')->user();

        if (!$user->is_active) {
            auth()->guard('company')->logout();
            return redirect()->route('company.login')->with('error', 'Your account has been deactivated.');
        }

        if (!$user->company->is_active) {
            auth()->guard('company')->logout();
            return redirect()->route('company.login')->with('error', 'Your company account is inactive.');
        }

        // Check subscription status
        if (!in_array($user->company->subscription_status, ['trial', 'active'])) {
            return redirect()->route('company.subscription.expired');
        }

        return $next($request);
    }
}