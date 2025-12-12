<?php

use App\Http\Controllers\CatalogueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Routes Catalogue/Formations
Route::get('/catalogue', [CatalogueController::class, 'index'])->name('catalogue');
Route::get('/catalogue/{slug}', [CatalogueController::class, 'show'])->name('catalogue.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
