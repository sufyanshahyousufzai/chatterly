<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->guard('super_admin')->check()) {
            return redirect()->route('super-admin.login');
        }

        if (!auth()->guard('super_admin')->user()->is_active) {
            auth()->guard('super_admin')->logout();
            return redirect()->route('super-admin.login')->with('error', 'Your account has been deactivated.');
        }

        return $next($request);
    }
}