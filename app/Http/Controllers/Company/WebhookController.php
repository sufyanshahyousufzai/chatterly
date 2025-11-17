<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebhookController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;
        
        $webhooks = [
            ['id' => 1, 'name' => 'New Chat', 'url' => 'https://example.com/webhook', 'events' => ['chat.created'], 'is_active' => true],
            ['id' => 2, 'name' => 'Ticket Created', 'url' => 'https://example.com/ticket', 'events' => ['ticket.created'], 'is_active' => true],
        ];

        return Inertia::render('company/Webhooks', [
            'webhooks' => $webhooks,
        ]);
    }
}
