<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index() {
        $company = auth()->guard('company')->user()->company;
        $documents = $company->documents()->latest()->paginate(20);
        return Inertia::render('company/Documents', ['documents' => $documents]);
    }
}
