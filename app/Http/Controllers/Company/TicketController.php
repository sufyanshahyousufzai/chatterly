<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketReply;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $query = Ticket::with(['client', 'assignedAgent'])
            ->where('company_id', $company->id);

        // Filters
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->priority) {
            $query->where('priority', $request->priority);
        }

        if ($request->assigned_to) {
            $query->where('assigned_to', $request->assigned_to);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('ticket_number', 'like', '%' . $request->search . '%')
                  ->orWhere('subject', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        $tickets = $query->latest()->paginate(20);

        $agents = Staff::where('company_id', $company->id)
            ->where('is_active', true)
            ->get(['id', 'name']);

        return Inertia::render('company/Tickets', [
            'tickets' => $tickets,
            'agents' => $agents,
            'filters' => $request->only(['status', 'priority', 'assigned_to', 'search']),
        ]);
    }

    public function show($id)
    {
        $company = auth()->guard('company')->user()->company;

        $ticket = Ticket::with(['client', 'visitor', 'assignedAgent', 'replies.sender'])
            ->where('company_id', $company->id)
            ->findOrFail($id);

        $agents = Staff::where('company_id', $company->id)
            ->where('is_active', true)
            ->get(['id', 'name']);

        return Inertia::render('company/TicketDetail', [
            'ticket' => $ticket,
            'agents' => $agents,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'client_id' => 'nullable|exists:clients,id',
            'priority' => 'required|in:low,medium,high,urgent',
            'category' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|exists:staff,id',
            'due_date' => 'nullable|date',
        ]);

        $company = auth()->guard('company')->user()->company;

        $ticket = Ticket::create([
            'company_id' => $company->id,
            'subject' => $request->subject,
            'description' => $request->description,
            'client_id' => $request->client_id,
            'priority' => $request->priority,
            'category' => $request->category,
            'assigned_to' => $request->assigned_to,
            'due_date' => $request->due_date,
            'source' => 'manual',
            'status' => 'open',
        ]);

        return redirect()->route('company.tickets.show', $ticket->id)
            ->with('success', 'Ticket created successfully!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high,urgent',
            'status' => 'required|in:open,pending,solved,closed',
            'category' => 'nullable|string|max:255',
            'assigned_to' => 'nullable|exists:staff,id',
            'due_date' => 'nullable|date',
        ]);

        $company = auth()->guard('company')->user()->company;

        $ticket = Ticket::where('company_id', $company->id)->findOrFail($id);

        $data = $request->only(['subject', 'description', 'priority', 'status', 'category', 'assigned_to', 'due_date']);

        // Set solved_at timestamp
        if ($request->status === 'solved' && $ticket->status !== 'solved') {
            $data['solved_at'] = now();
        }

        // Set closed_at timestamp
        if ($request->status === 'closed' && $ticket->status !== 'closed') {
            $data['closed_at'] = now();
        }

        $ticket->update($data);

        return back()->with('success', 'Ticket updated successfully!');
    }

    public function addReply(Request $request, $id)
    {
        $request->validate([
            'message' => 'required|string',
            'is_internal' => 'boolean',
        ]);

        $company = auth()->guard('company')->user()->company;
        $user = auth()->guard('company')->user();

        $ticket = Ticket::where('company_id', $company->id)->findOrFail($id);

        TicketReply::create([
            'ticket_id' => $ticket->id,
            'sender_type' => get_class($user),
            'sender_id' => $user->id,
            'message' => $request->message,
            'is_internal' => $request->is_internal ?? false,
        ]);

        return back()->with('success', 'Reply added successfully!');
    }

    public function destroy($id)
    {
        $company = auth()->guard('company')->user()->company;

        $ticket = Ticket::where('company_id', $company->id)->findOrFail($id);
        $ticket->delete();

        return redirect()->route('company.tickets.index')
            ->with('success', 'Ticket deleted successfully!');
    }
}
