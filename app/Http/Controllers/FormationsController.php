<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Helpers\SupabaseHelper;
use App\Models\Formation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FormationsController extends Controller
{
    /**
     * Affiche les formations
     */
    public function index(Request $request): Response
    {
        // Récupérer toutes les formations publiées avec leurs catégories
        $formations = Formation::with(['category'])
            ->where('is_published', true)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculer les statistiques de certification
        $certificationStats = [
            'certifiantes' => $formations->where('certification', true)->count(),
            'non_certifiantes' => $formations->where('certification', false)->count(),
        ];

        // Transformer les données pour le frontend
        $formattedFormations = $formations->map(function ($formation) {
            return [
                'id' => $formation->id,
                'title' => $formation->title,
                'slug' => $formation->slug,
                'short_description' => $formation->short_description,
                'description' => $formation->description,
                'objectives' => $formation->objectives,
                'show_objectives' => $formation->show_objectives,
                'prerequisites' => $formation->prerequisites,
                'show_prerequisites' => $formation->show_prerequisites,
                'program' => $formation->program,
                'show_program' => $formation->show_program,
                'duration' => $formation->duration,
                'show_duration' => $formation->show_duration,
                'level' => $formation->level,
                'target_audience' => $formation->target_audience,
                'training_methods' => $formation->training_methods,
                'certification' => $formation->certification,
                'certification_label' => $formation->certification_label,
                'order' => $formation->order,
                'image' => $formation->image ? SupabaseHelper::getPublicUrl($formation->image) : null,
                'pdf_file' => $formation->pdf_file ? SupabaseHelper::getPublicUrl($formation->pdf_file) : null,
                'category' => $formation->category ? [
                    'id' => $formation->category->id,
                    'name' => $formation->category->name,
                    'slug' => $formation->category->slug,
                    'color' => $formation->category->color,
                    'icon' => $formation->category->icon,
                ] : null,
                'published_at' => $formation->published_at?->format('d/m/Y'),
            ];
        });

        return Inertia::render('formations', [
            'formations' => $formattedFormations,
            'certificationStats' => $certificationStats,
        ]);
    }

    /**
     * Affiche le détail d'une formation
     */
    public function show(string $slug): Response
    {
        $formation = Formation::with(['category'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->first();

        if (! $formation) {
            abort(404, 'Formation non trouvée');
        }

        $formattedFormation = [
            'id' => $formation->id,
            'title' => $formation->title,
            'slug' => $formation->slug,
            'short_description' => $formation->short_description,
            'description' => $formation->description,
            'objectives' => $formation->objectives,
            'show_objectives' => $formation->show_objectives,
            'prerequisites' => $formation->prerequisites,
            'show_prerequisites' => $formation->show_prerequisites,
            'program' => $formation->program,
            'show_program' => $formation->show_program,
            'duration' => $formation->duration,
            'show_duration' => $formation->show_duration,
            'level' => $formation->level,
            'target_audience' => $formation->target_audience,
            'training_methods' => $formation->training_methods,
            'certification' => $formation->certification,
            'certification_label' => $formation->certification_label,
            'order' => $formation->order,
            'image' => $formation->image ? SupabaseHelper::getPublicUrl($formation->image) : null,
            'pdf_file' => $formation->pdf_file ? SupabaseHelper::getPublicUrl($formation->pdf_file) : null,
            'category' => $formation->category ? [
                'id' => $formation->category->id,
                'name' => $formation->category->name,
                'slug' => $formation->category->slug,
                'color' => $formation->category->color,
                'icon' => $formation->category->icon,
            ] : null,
            'published_at' => $formation->published_at?->format('d/m/Y'),
        ];

        // Formations similaires (même catégorie, exclure la formation actuelle)
        $relatedFormations = Formation::with(['category'])
            ->where('formation_category_id', $formation->formation_category_id)
            ->where('id', '!=', $formation->id)
            ->where('is_published', true)
            ->orderBy('order', 'asc')
            ->limit(3)
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'title' => $formation->title,
                    'slug' => $formation->slug,
                    'short_description' => $formation->short_description,
                    'duration' => $formation->duration,
                    'level' => $formation->level,
                    'image' => $formation->image ? SupabaseHelper::getPublicUrl($formation->image) : null,
                    'category' => $formation->category ? [
                        'name' => $formation->category->name,
                        'color' => $formation->category->color,
                    ] : null,
                ];
            });

        return Inertia::render('formations/detail', [
            'formation' => $formattedFormation,
            'relatedFormations' => $relatedFormations,
        ]);
    }

    /**
     * API endpoint pour récupérer les formations
     */
    public function apiFormations()
    {
        // Récupérer toutes les formations publiées avec leurs catégories
        $formations = Formation::with(['category'])
            ->where('is_published', true)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Transformer les données pour l'API
        $formattedFormations = $formations->map(function ($formation) {
            return [
                'id' => $formation->id,
                'title' => $formation->title,
                'slug' => $formation->slug,
                'short_description' => $formation->short_description,
                'description' => $formation->description,
                'duration' => $formation->duration,
                'level' => $formation->level,
                'certification' => $formation->certification,
                'image' => $formation->image ? SupabaseHelper::getPublicUrl($formation->image) : null,
                'category' => $formation->category ? [
                    'id' => $formation->category->id,
                    'name' => $formation->category->name,
                    'slug' => $formation->category->slug,
                    'color' => $formation->category->color,
                    'icon' => $formation->category->icon,
                ] : null,
                'published_at' => $formation->published_at?->format('d/m/Y'),
            ];
        });

        return response()->json($formattedFormations);
    }
}
