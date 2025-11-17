<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisterController;

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

    Route::get('/dashboard', function () {
        return Inertia::render('company/Dashboard');
    })->name('dashboard');
});
