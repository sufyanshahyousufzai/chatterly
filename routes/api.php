<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WidgetApiController;

// Widget API routes (public, CORS-enabled)
Route::prefix('widget')->group(function () {
    Route::get('/{companyUuid}/settings', [WidgetApiController::class, 'getSettings']);
    Route::post('/{companyUuid}/track', [WidgetApiController::class, 'trackVisitor']);
    Route::post('/{companyUuid}/conversation', [WidgetApiController::class, 'startConversation']);
    Route::get('/{companyUuid}/conversation/{conversationUuid}/messages', [WidgetApiController::class, 'getMessages']);
    Route::post('/{companyUuid}/conversation/{conversationUuid}/message', [WidgetApiController::class, 'sendMessage']);
});
