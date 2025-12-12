<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\FormationCategory;
use Illuminate\Console\Command;

class CleanEmptyCategories extends Command
{
    protected $signature = 'formations:clean-empty-categories {--dry-run : Simuler la suppression sans l\'appliquer}';

    protected $description = 'Supprime les catégories de formations qui n\'ont aucune formation associée';

    public function handle(): int
    {
        $this->info('🗑️ Nettoyage des catégories vides');
        $this->newLine();

        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->warn('🔍 Mode DRY-RUN : Aucune suppression ne sera appliquée');
            $this->newLine();
        }

        // Récupérer toutes les catégories avec le nombre de formations
        $categories = FormationCategory::withCount('formations')->get();

        $this->info("📊 Analyse de {$categories->count()} catégorie(s)");
        $this->newLine();

        $emptyCategories = $categories->where('formations_count', 0);
        $categoriesWithFormations = $categories->where('formations_count', '>', 0);

        // Afficher les catégories avec formations
        if ($categoriesWithFormations->count() > 0) {
            $this->line('✅ Catégories avec formations :');
            foreach ($categoriesWithFormations as $category) {
                $this->line("   📁 {$category->name} ({$category->formations_count} formation(s))");
            }
            $this->newLine();
        }

        // Traiter les catégories vides
        if ($emptyCategories->count() > 0) {
            $this->line('❌ Catégories vides trouvées :');

            foreach ($emptyCategories as $category) {
                $this->line("   🗑️ {$category->name} (ID: {$category->id})");

                if (! $isDryRun) {
                    try {
                        $categoryName = $category->name;
                        $category->delete();
                        $this->line('      ✅ Supprimée avec succès');
                    } catch (\Exception $e) {
                        $this->line("      ❌ Erreur lors de la suppression: {$e->getMessage()}");
                    }
                }
            }

            $this->newLine();

            if ($isDryRun) {
                $this->info("🔍 {$emptyCategories->count()} catégorie(s) vide(s) trouvée(s)");
                $this->line('🎯 Exécutez sans --dry-run pour supprimer ces catégories');
            } else {
                $this->info("✅ {$emptyCategories->count()} catégorie(s) vide(s) supprimée(s)");
            }
        } else {
            $this->info('✅ Aucune catégorie vide trouvée');
            $this->line('🎯 Toutes les catégories contiennent au moins une formation');
        }

        // Résumé final
        $this->newLine();
        $this->line('📋 Résumé :');
        $this->line("   📁 Catégories avec formations : {$categoriesWithFormations->count()}");
        $this->line("   🗑️ Catégories vides : {$emptyCategories->count()}");

        return 0;
    }
}
