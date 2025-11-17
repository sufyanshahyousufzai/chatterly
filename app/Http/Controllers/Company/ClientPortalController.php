<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ClientPortalController extends Controller
{
    public function index() {
        $company = auth()->guard('company')->user()->company;
        $clients = $company->clients()->with('createdBy')->latest()->paginate(20);
        return Inertia::render('company/ClientPortal', ['clients' => $clients]);
    }
}
