<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $query = Company::with(['subscriptionPlan', 'owner']);

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->status) {
            $query->where('subscription_status', $request->status);
        }

        $companies = $query->latest()->paginate(20);

        return Inertia::render('superadmin/Companies', [
            'companies' => $companies,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show($id)
    {
        $company = Company::with(['subscriptionPlan', 'owner', 'staff', 'clients'])
            ->withCount(['chatConversations', 'tickets', 'visitors'])
            ->findOrFail($id);

        return Inertia::render('superadmin/CompanyDetail', [
            'company' => $company,
        ]);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);
        $company->update($request->only(['is_active', 'subscription_status']));
        return back()->with('success', 'Company updated successfully!');
    }

    public function destroy($id)
    {
        Company::findOrFail($id)->delete();
        return redirect()->route('superadmin.companies.index')
            ->with('success', 'Company deleted successfully!');
    }
}
