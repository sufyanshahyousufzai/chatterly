<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\SubscriptionPlan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    /**
     * Show the registration form
     */
    public function show()
    {
        $plans = SubscriptionPlan::where('is_active', true)
            ->orderBy('price', 'asc')
            ->get();

        return Inertia::render('auth/Register', [
            'plans' => $plans,
        ]);
    }

    /**
     * Handle registration
     */
    public function store(RegisterRequest $request)
    {
        try {
            DB::beginTransaction();

            // Create the company
            $company = Company::create([
                'name' => $request->company_name,
                'slug' => \Str::slug($request->company_name),
                'subscription_plan_id' => $request->subscription_plan_id ?? 1, // Default to first plan
                'subscription_status' => 'trial',
                'trial_ends_at' => now()->addDays(14),
                'is_active' => true,
            ]);

            // Create the company owner user
            $user = CompanyUser::create([
                'company_id' => $company->id,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'role' => 'owner',
                'is_owner' => true,
                'is_active' => true,
            ]);

            DB::commit();

            // Log the user in
            auth()->guard('company')->login($user);

            return redirect()->route('company.onboarding')
                ->with('success', 'Welcome to Chatterly! Let\'s get you set up.');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()
                ->withErrors(['error' => 'Registration failed. Please try again.'])
                ->withInput();
        }
    }
}
