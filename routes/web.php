<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('web/Home');
});

Route::get('/welcome', function () {
    return Inertia::render('web/Welcome');
});

Route::get('/components', function () {
    return Inertia::render('web/ComponentsDemo');
});
