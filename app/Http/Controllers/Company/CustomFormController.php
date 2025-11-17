<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Models\CustomForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomFormController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;
        $forms = CustomForm::where('company_id', $company->id)->latest()->get();

        return Inertia::render('company/CustomForms', [
            'forms' => $forms,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'form_type' => 'required|in:pre_chat,offline,client_portal,general',
            'form_fields' => 'required|array',
        ]);

        $company = auth()->guard('company')->user()->company;

        CustomForm::create([
            'company_id' => $company->id,
            'name' => $request->name,
            'form_type' => $request->form_type,
            'description' => $request->description,
            'form_fields' => $request->form_fields,
            'is_active' => true,
        ]);

        return back()->with('success', 'Form created successfully!');
    }
}
