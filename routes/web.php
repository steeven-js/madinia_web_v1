<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FormationsController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

// Routes Formations
Route::get('/formations', [FormationsController::class, 'index'])->name('formations');
Route::get('/formations/{slug}', [FormationsController::class, 'show'])->name('formations.detail');

// Routes Services
Route::prefix('services')->name('services.')->group(function () {
    Route::get('/conference-ia', [ServicesController::class, 'conferenceIa'])->name('conference-ia');
    Route::get('/audit-et-conseils-ia', [ServicesController::class, 'auditEtConseilsIa'])->name('audit-et-conseils-ia');
    Route::get('/accompagnement-perso', [ServicesController::class, 'accompagnementPerso'])->name('accompagnement-perso');
});

// Routes About
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/about/{slug}', [AboutController::class, 'show'])->name('about.detail');

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
