<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use App\Models\FormationCategory;
use Illuminate\Console\Command;

class TestFormationCategoriesColors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'formations:test-colors';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Teste l\'affichage des couleurs des catégories de formations';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🎨 Test des couleurs des catégories de formations');
        $this->newLine();

        // Vérifier les catégories et leurs couleurs
        $categories = FormationCategory::orderBy('order')->get();

        if ($categories->isEmpty()) {
            $this->error('❌ Aucune catégorie de formation trouvée !');
            $this->info('💡 Exécutez: php artisan db:seed --class=FormationSeeder');

            return 1;
        }

        $this->info('📋 Catégories de formations avec couleurs :');
        $this->newLine();

        foreach ($categories as $category) {
            $formationsCount = $category->formations()->count();
            $activeFormationsCount = $category->activeFormations()->count();

            $this->line(sprintf(
                '• <fg=white;bg=black> %s </> <comment>%s</comment> - Couleur: <fg=white;bg=black> %s </> - Formations: %d (%d publiées)',
                str_pad($category->order, 2, '0', STR_PAD_LEFT),
                str_pad($category->name, 40),
                $category->color,
                $formationsCount,
                $activeFormationsCount
            ));
        }

        $this->newLine();

        // Vérifier quelques formations avec leurs catégories
        $formations = Formation::with('category')->published()->take(5)->get();

        if ($formations->isNotEmpty()) {
            $this->info('📚 Exemples de formations avec couleurs de catégories :');
            $this->newLine();

            foreach ($formations as $formation) {
                $categoryName = $formation->category ? $formation->category->name : 'Sans catégorie';
                $categoryColor = $formation->category ? $formation->category->color : '#gray';

                $this->line(sprintf(
                    '• <comment>%s</comment> → Catégorie: <fg=white;bg=black> %s </> (Couleur: %s)',
                    str_pad(substr($formation->title, 0, 50), 52),
                    $categoryName,
                    $categoryColor
                ));
            }
        }

        $this->newLine();

        // Statistiques
        $totalCategories = $categories->count();
        $totalFormations = Formation::count();
        $publishedFormations = Formation::published()->count();
        $categoriesWithColors = $categories->where('color', '!=', null)->count();

        $this->info('📊 Statistiques :');
        $this->line("• Catégories totales: {$totalCategories}");
        $this->line("• Catégories avec couleurs: {$categoriesWithColors}");
        $this->line("• Formations totales: {$totalFormations}");
        $this->line("• Formations publiées: {$publishedFormations}");

        $this->newLine();

        if ($categoriesWithColors === $totalCategories) {
            $this->info('✅ Toutes les catégories ont des couleurs définies !');
            $this->info('🎯 L\'affichage des couleurs dans Filament devrait fonctionner correctement.');
        } else {
            $this->warn('⚠️ '.($totalCategories - $categoriesWithColors).' catégorie(s) sans couleur définie.');
        }

        return 0;
    }
}
