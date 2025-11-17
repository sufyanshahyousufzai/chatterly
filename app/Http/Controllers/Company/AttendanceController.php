<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function index() {
        $company = auth()->guard('company')->user()->company;
        $staff = $company->staff()->where('is_active', true)->get();
        return Inertia::render('company/Attendance', ['staff' => $staff]);
    }
}
