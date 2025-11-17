<?php
namespace App\Http\Controllers\Company;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $user = auth()->guard('company')->user();
        $notifications = $user->notifications()->latest()->paginate(20);
        return Inertia::render('company/Notifications', ['notifications' => $notifications]);
    }
}
