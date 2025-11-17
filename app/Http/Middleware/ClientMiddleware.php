<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!auth()->guard('client')->check()) {
            return redirect()->route('client.login');
        }

        $client = auth()->guard('client')->user();

        if (!$client->is_active) {
            auth()->guard('client')->logout();
            return redirect()->route('client.login')->with('error', 'Your account has been deactivated.');
        }

        if (!$client->portal_access) {
            auth()->guard('client')->logout();
            return redirect()->route('client.login')->with('error', 'Portal access has been disabled.');
        }

        if (!$client->company->is_active) {
            auth()->guard('client')->logout();
            return redirect()->route('client.login')->with('error', 'Company account is inactive.');
        }

        return $next($request);
    }
}