<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Formation;
use App\Models\FormationCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Affiche la page d'accueil avec les formations et catégories
     */
    public function index(Request $request): Response
    {
        // Récupérer toutes les formations publiées avec leurs catégories
        $formations = Formation::with(['category'])
            ->where('is_published', true)
            ->orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        // Récupérer toutes les catégories
        $categories = FormationCategory::orderBy('order', 'asc')
            ->orderBy('name', 'asc')
            ->get();

        // Transformer les formations pour le frontend
        $formattedFormations = $formations->map(function ($formation) {
            return [
                'id' => $formation->id,
                'title' => $formation->title,
                'slug' => $formation->slug,
                'short_description' => $formation->short_description,
                'category' => $formation->category ? [
                    'id' => $formation->category->id,
                    'name' => $formation->category->name,
                    'slug' => $formation->category->slug,
                    'color' => $formation->category->color,
                    'icon' => $formation->category->icon,
                ] : null,
            ];
        });

        // Transformer les catégories pour le frontend
        $formattedCategories = $categories->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'color' => $category->color ?? '#000000',
                'icon' => $category->icon,
                'order' => $category->order ?? 0,
            ];
        });

        return Inertia::render('home', [
            'formations' => $formattedFormations,
            'categories' => $formattedCategories,
        ]);
    }
}
