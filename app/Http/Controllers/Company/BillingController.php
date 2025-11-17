<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $company = auth()->guard('company')->user()->company;
        $invoices = Invoice::where('company_id', $company->id)->latest()->paginate(20);
        return Inertia::render('company/Billing', [
            'company' => $company,
            'invoices' => $invoices,
        ]);
    }
}
