<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\ChatbotTrigger;
use App\Models\ChatbotResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatbotController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;

        $triggers = ChatbotTrigger::where('company_id', $company->id)
            ->orderBy('sort_order', 'asc')
            ->get();

        $responses = ChatbotResponse::where('company_id', $company->id)
            ->get();

        return Inertia::render('company/Chatbot', [
            'triggers' => $triggers,
            'responses' => $responses,
        ]);
    }

    public function storeTrigger(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'trigger_type' => 'required|in:keyword,url,time_on_site,page_visit_count,greeting',
            'keywords' => 'nullable|array',
            'url_pattern' => 'nullable|string',
            'time_seconds' => 'nullable|integer|min:1',
            'page_visit_count' => 'nullable|integer|min:1',
            'response_type' => 'required|in:text,quick_replies,form,transfer_to_agent',
            'response_message' => 'required|string',
            'quick_replies' => 'nullable|array',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $company = auth()->guard('company')->user()->company;

        ChatbotTrigger::create([
            'company_id' => $company->id,
            ...$request->all(),
        ]);

        return back()->with('success', 'Chatbot trigger created successfully!');
    }

    public function updateTrigger(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'trigger_type' => 'required|in:keyword,url,time_on_site,page_visit_count,greeting',
            'keywords' => 'nullable|array',
            'url_pattern' => 'nullable|string',
            'time_seconds' => 'nullable|integer|min:1',
            'page_visit_count' => 'nullable|integer|min:1',
            'response_type' => 'required|in:text,quick_replies,form,transfer_to_agent',
            'response_message' => 'required|string',
            'quick_replies' => 'nullable|array',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer',
        ]);

        $company = auth()->guard('company')->user()->company;

        $trigger = ChatbotTrigger::where('company_id', $company->id)->findOrFail($id);
        $trigger->update($request->all());

        return back()->with('success', 'Chatbot trigger updated successfully!');
    }

    public function destroyTrigger($id)
    {
        $company = auth()->guard('company')->user()->company;

        $trigger = ChatbotTrigger::where('company_id', $company->id)->findOrFail($id);
        $trigger->delete();

        return back()->with('success', 'Chatbot trigger deleted successfully!');
    }

    public function storeResponse(Request $request)
    {
        $request->validate([
            'keyword' => 'required|string|max:255',
            'response' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;

        ChatbotResponse::create([
            'company_id' => $company->id,
            ...$request->all(),
        ]);

        return back()->with('success', 'Chatbot response created successfully!');
    }

    public function updateResponse(Request $request, $id)
    {
        $request->validate([
            'keyword' => 'required|string|max:255',
            'response' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;

        $response = ChatbotResponse::where('company_id', $company->id)->findOrFail($id);
        $response->update($request->all());

        return back()->with('success', 'Chatbot response updated successfully!');
    }

    public function destroyResponse($id)
    {
        $company = auth()->guard('company')->user()->company;

        $response = ChatbotResponse::where('company_id', $company->id)->findOrFail($id);
        $response->delete();

        return back()->with('success', 'Chatbot response deleted successfully!');
    }
}
