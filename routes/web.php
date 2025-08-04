<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Member management routes
    Route::resource('members', MemberController::class);
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
