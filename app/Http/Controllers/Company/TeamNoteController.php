<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\TeamNote;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class TeamNoteController extends Controller
{
    public function index(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $notes = TeamNote::where('company_id', $company->id)
            ->with(['staff', 'mentionedStaff', 'notable'])
            ->when($request->type, function ($query, $type) {
                $query->where('notable_type', $type);
            })
            ->latest()
            ->paginate(30);

        return Inertia::render('company/TeamNotes', [
            'notes' => $notes,
        ]);
    }

    public function store(Request $request)
    {
        $company = auth()->guard('company')->user()->company;
        $staff = auth()->guard('company')->user();

        $request->validate([
            'notable_type' => 'required|in:chat,ticket,client',
            'notable_id' => 'required|integer',
            'content' => 'required|string|max:2000',
            'mentioned_staff_ids' => 'nullable|array',
            'mentioned_staff_ids.*' => 'exists:staff,id',
        ]);

        DB::beginTransaction();
        try {
            $note = TeamNote::create([
                'company_id' => $company->id,
                'staff_id' => $staff->id,
                'notable_type' => $request->notable_type,
                'notable_id' => $request->notable_id,
                'content' => $request->content,
                'is_pinned' => false,
            ]);

            // Attach mentioned staff
            if ($request->mentioned_staff_ids) {
                $note->mentionedStaff()->attach($request->mentioned_staff_ids);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Internal note added successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Failed to add note');
        }
    }

    public function update(Request $request, $id)
    {
        $company = auth()->guard('company')->user()->company;
        $note = TeamNote::where('company_id', $company->id)->findOrFail($id);

        $request->validate([
            'content' => 'required|string|max:2000',
        ]);

        $note->update([
            'content' => $request->content,
        ]);

        return redirect()->back()->with('success', 'Note updated successfully');
    }

    public function destroy($id)
    {
        $company = auth()->guard('company')->user()->company;
        $note = TeamNote::where('company_id', $company->id)->findOrFail($id);

        $note->delete();

        return redirect()->back()->with('success', 'Note deleted successfully');
    }

    public function togglePin($id)
    {
        $company = auth()->guard('company')->user()->company;
        $note = TeamNote::where('company_id', $company->id)->findOrFail($id);

        $note->update([
            'is_pinned' => !$note->is_pinned,
        ]);

        return redirect()->back()->with('success', 'Note pin status updated');
    }

    public function getByNotable(Request $request)
    {
        $company = auth()->guard('company')->user()->company;

        $request->validate([
            'notable_type' => 'required|in:chat,ticket,client',
            'notable_id' => 'required|integer',
        ]);

        $notes = TeamNote::where('company_id', $company->id)
            ->where('notable_type', $request->notable_type)
            ->where('notable_id', $request->notable_id)
            ->with(['staff', 'mentionedStaff'])
            ->orderBy('is_pinned', 'desc')
            ->latest()
            ->get();

        return response()->json([
            'notes' => $notes,
        ]);
    }
}
