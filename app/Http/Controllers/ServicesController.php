<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    /**
     * Affiche la page Conférence IA
     */
    public function conferenceIa(): Response
    {
        return Inertia::render('conference-ia');
    }

    /**
     * Affiche la page Audit & Conseils IA
     */
    public function auditEtConseilsIa(): Response
    {
        return Inertia::render('audit-et-conseils-ia');
    }

    /**
     * Affiche la page Accompagnement Personnalisé
     */
    public function accompagnementPerso(): Response
    {
        return Inertia::render('accompagnement-perso');
    }
}
