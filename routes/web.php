<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FormationsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PreinscriptionFormationController;
use App\Http\Controllers\ServicesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::prefix('formations')->name('formations.')->group(function () {
    Route::get('/', [FormationsController::class, 'index'])->name('index');
    // Routes Pré-inscription (doivent être avant /{slug} pour éviter les conflits)
    Route::get('/preinscription', [PreinscriptionFormationController::class, 'index'])->name('preinscription.index');
    Route::post('/preinscription', [PreinscriptionFormationController::class, 'store'])->name('preinscription.store');
    // Route détail formation (doit être en dernier car elle capture tout)
    Route::get('/{slug}', [FormationsController::class, 'show'])->name('detail');
});

// Routes Services
Route::prefix('services')->name('services.')->group(function () {
    Route::get('/conference-ia', [ServicesController::class, 'conferenceIa'])->name('conference-ia');
    Route::get('/audit-et-conseils-ia', [ServicesController::class, 'auditEtConseilsIa'])->name('audit-et-conseils-ia');
    Route::get('/accompagnement-perso', [ServicesController::class, 'accompagnementPerso'])->name('accompagnement-perso');
});

// Routes About
Route::prefix('about')->name('about.')->group(function () {
    Route::get('/', [AboutController::class, 'index'])->name('index');
    Route::get('/certification-qualiopi', function () {
        return Inertia::render('certification-qualiopi');
    })->name('certification-qualiopi');
    Route::get('/{slug}', [AboutController::class, 'show'])->name('detail');
});

// Routes légales
Route::get('/privacy-policy', function () {
    return Inertia::render('privacy-policy');
})->name('privacy-policy');

Route::get('/reglement-interieur', function () {
    return Inertia::render('reglement-interieur');
})->name('reglement-interieur');

// Routes Blog
Route::prefix('blog')->name('blog.')->group(function () {
    Route::get('/posts', function () {
        return Inertia::render('blog/posts');
    })->name('posts');
    Route::get('/posts/details', function () {
        return Inertia::render('blog/post');
    })->name('post');
});

// Routes Contact
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
