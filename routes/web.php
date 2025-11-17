<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Company\DashboardController;
use App\Http\Controllers\Company\ChatController;
use App\Http\Controllers\Company\WidgetController;

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
});
