<?php

use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Routes Catalogue/Formations
Route::get('/catalogue', [CatalogueController::class, 'index'])->name('catalogue');
Route::get('/catalogue/{slug}', [CatalogueController::class, 'show'])->name('catalogue.detail');

// Routes Services
Route::get('/conference-ia', function () {
    return Inertia::render('conference-ia');
})->name('conference-ia');

Route::get('/audit-et-conseils-ia', function () {
    return Inertia::render('audit-et-conseils-ia');
})->name('audit-et-conseils-ia');

Route::get('/accompagnement-perso', function () {
    return Inertia::render('accompagnement-perso');
})->name('accompagnement-perso');

// Routes légales
Route::get('/privacy-policy', function () {
    return Inertia::render('privacy-policy');
})->name('privacy-policy');

Route::get('/reglement-interieur', function () {
    return Inertia::render('reglement-interieur');
})->name('reglement-interieur');

Route::get('/certification-qualiopi', function () {
    return Inertia::render('certification-qualiopi');
})->name('certification-qualiopi');

// Routes Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
