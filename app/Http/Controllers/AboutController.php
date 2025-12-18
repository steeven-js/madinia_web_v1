<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Affiche la page About
     */
    public function index(): Response
    {
        return Inertia::render('about');
    }

    /**
     * Affiche le détail d'une section About (pour usage futur)
     */
    public function show(string $slug): Response
    {
        // Pour l'instant, rediriger vers la page principale
        return Inertia::render('about');
    }
}
