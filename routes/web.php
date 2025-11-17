<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Company\DashboardController;
use App\Http\Controllers\Company\ChatController;
use App\Http\Controllers\Company\WidgetController;
use App\Http\Controllers\Company\ChatbotController;
use App\Http\Controllers\Company\TicketController;
use App\Http\Controllers\Company\KnowledgeBaseController;
use App\Http\Controllers\Company\ClientPortalController;
use App\Http\Controllers\Company\AttendanceController;
use App\Http\Controllers\Company\DocumentController;
use App\Http\Controllers\Company\AnalyticsController;
use App\Http\Controllers\Company\RoleController;
use App\Http\Controllers\Company\NotificationController;
use App\Http\Controllers\Company\SettingsController;
use App\Http\Controllers\Company\BillingController;
use App\Http\Controllers\Company\PerformanceController;
use App\Http\Controllers\Company\EmailTemplateController;
use App\Http\Controllers\Company\CustomFormController;
use App\Http\Controllers\Company\WebhookController;
use App\Http\Controllers\Company\ActivityLogController;
use App\Http\Controllers\SuperAdmin\DashboardController as SuperAdminDashboardController;
use App\Http\Controllers\SuperAdmin\CompanyController as SuperAdminCompanyController;

// Public routes
Route::get('/', function () {
    return Inertia::render('web/Home');
});

Route::get('/pricing', function () {
    return Inertia::render('web/Pricing');
});

Route::get('/welcome', function () {
    return Inertia::render('web/Welcome');
});

Route::get('/components', function () {
    return Inertia::render('web/ComponentsDemo');
});

// Auth routes
Route::get('/register', [RegisterController::class, 'show'])->name('register');
Route::post('/register', [RegisterController::class, 'store']);

// Company routes (authenticated)
Route::middleware('company')->prefix('company')->name('company.')->group(function () {
    Route::get('/onboarding', function () {
        return Inertia::render('company/Onboarding');
    })->name('onboarding');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Chat routes
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::get('/chat/{id}', [ChatController::class, 'show'])->name('chat.show');
    Route::post('/chat/{id}/message', [ChatController::class, 'sendMessage'])->name('chat.message');
    Route::post('/chat/{id}/read', [ChatController::class, 'markAsRead'])->name('chat.read');
    Route::post('/chat/{id}/close', [ChatController::class, 'closeConversation'])->name('chat.close');

    // Widget routes
    Route::get('/widget/settings', [WidgetController::class, 'index'])->name('widget.settings');
    Route::put('/widget/settings', [WidgetController::class, 'update'])->name('widget.update');
    Route::get('/widget/preview', [WidgetController::class, 'preview'])->name('widget.preview');

    // Chatbot routes
    Route::get('/chatbot', [ChatbotController::class, 'index'])->name('chatbot.index');
    Route::post('/chatbot/triggers', [ChatbotController::class, 'storeTrigger'])->name('chatbot.triggers.store');
    Route::put('/chatbot/triggers/{id}', [ChatbotController::class, 'updateTrigger'])->name('chatbot.triggers.update');
    Route::delete('/chatbot/triggers/{id}', [ChatbotController::class, 'destroyTrigger'])->name('chatbot.triggers.destroy');
    Route::post('/chatbot/responses', [ChatbotController::class, 'storeResponse'])->name('chatbot.responses.store');
    Route::put('/chatbot/responses/{id}', [ChatbotController::class, 'updateResponse'])->name('chatbot.responses.update');
    Route::delete('/chatbot/responses/{id}', [ChatbotController::class, 'destroyResponse'])->name('chatbot.responses.destroy');

    // Ticket routes
    Route::get('/tickets', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/tickets/{id}', [TicketController::class, 'show'])->name('tickets.show');
    Route::post('/tickets', [TicketController::class, 'store'])->name('tickets.store');
    Route::put('/tickets/{id}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('/tickets/{id}', [TicketController::class, 'destroy'])->name('tickets.destroy');
    Route::post('/tickets/{id}/replies', [TicketController::class, 'addReply'])->name('tickets.replies.store');

    // Knowledge Base routes
    Route::get('/kb', [KnowledgeBaseController::class, 'index'])->name('kb.index');
    Route::get('/kb/{id}', [KnowledgeBaseController::class, 'show'])->name('kb.show');
    Route::post('/kb', [KnowledgeBaseController::class, 'store'])->name('kb.store');
    Route::put('/kb/{id}', [KnowledgeBaseController::class, 'update'])->name('kb.update');
    Route::delete('/kb/{id}', [KnowledgeBaseController::class, 'destroy'])->name('kb.destroy');
    Route::post('/kb/categories', [KnowledgeBaseController::class, 'storeCategory'])->name('kb.categories.store');

    // Client Portal
    Route::get('/portal', [ClientPortalController::class, 'index'])->name('portal.index');

    // Attendance & Leave
    Route::get('/attendance', [AttendanceController::class, 'index'])->name('attendance.index');

    // Documents & Assets
    Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index');

    // Analytics & Reports
    Route::get('/analytics', [AnalyticsController::class, 'index'])->name('analytics.index');

    // Roles & Permissions
    Route::get('/roles', [RoleController::class, 'index'])->name('roles.index');
    Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');

    // Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings', [SettingsController::class, 'update'])->name('settings.update');

    // Billing
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');

    // Performance & Reports
    Route::get('/performance', [PerformanceController::class, 'index'])->name('performance.index');

    // Email Templates
    Route::get('/email-templates', [EmailTemplateController::class, 'index'])->name('email-templates.index');

    // Custom Forms
    Route::get('/forms', [CustomFormController::class, 'index'])->name('forms.index');
    Route::post('/forms', [CustomFormController::class, 'store'])->name('forms.store');

    // Webhooks
    Route::get('/webhooks', [WebhookController::class, 'index'])->name('webhooks.index');

    // Activity Logs
    Route::get('/activity-logs', [ActivityLogController::class, 'index'])->name('activity-logs.index');
});

// Super Admin routes
Route::middleware('super_admin')->prefix('superadmin')->name('superadmin.')->group(function () {
    Route::get('/dashboard', [SuperAdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/companies', [SuperAdminCompanyController::class, 'index'])->name('companies.index');
    Route::get('/companies/{id}', [SuperAdminCompanyController::class, 'show'])->name('companies.show');
    Route::put('/companies/{id}', [SuperAdminCompanyController::class, 'update'])->name('companies.update');
    Route::delete('/companies/{id}', [SuperAdminCompanyController::class, 'destroy'])->name('companies.destroy');
});
