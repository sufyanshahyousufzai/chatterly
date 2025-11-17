<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use App\Models\CompanySettings;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;
        $settings = CompanySettings::firstOrCreate(['company_id' => $company->id]);
        return Inertia::render('company/Settings', ['company' => $company, 'settings' => $settings]);
    }

    public function update(Request $request)
    {
        $company = auth()->guard('company')->user()->company;
        $company->update($request->only(['name', 'email', 'phone', 'timezone', 'currency']));
        return back()->with('success', 'Settings updated successfully!');
    }
}
