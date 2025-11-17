<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailTemplateController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;
        
        $templates = [
            ['id' => 1, 'name' => 'Welcome Email', 'subject' => 'Welcome to Support', 'type' => 'client'],
            ['id' => 2, 'name' => 'Ticket Response', 'subject' => 'Re: Your Ticket', 'type' => 'ticket'],
            ['id' => 3, 'name' => 'Chat Transcript', 'subject' => 'Chat Transcript', 'type' => 'chat'],
        ];

        return Inertia::render('company/EmailTemplates', [
            'templates' => $templates,
        ]);
    }
}
