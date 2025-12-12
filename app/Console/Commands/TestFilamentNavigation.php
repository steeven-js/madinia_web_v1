<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Filament\Facades\Filament;
use Illuminate\Console\Command;

class TestFilamentNavigation extends Command
{
    protected $signature = 'filament:test-navigation';

    protected $description = 'Teste la configuration de la navigation Filament';

    public function handle(): int
    {
        $this->info('🧭 Test de la navigation Filament');
        $this->newLine();

        // Obtenir le panel admin
        $panel = Filament::getPanel('admin');
        $resources = $panel->getResources();

        $this->info('📊 Ressources Filament détectées:');
        $this->newLine();

        $navigationGroups = [];

        foreach ($resources as $resource) {
            $navigationGroup = $resource::getNavigationGroup();
            $navigationLabel = $resource::getNavigationLabel();
            $navigationSort = $resource::getNavigationSort();
            $navigationIcon = $resource::getNavigationIcon();

            if (! isset($navigationGroups[$navigationGroup])) {
                $navigationGroups[$navigationGroup] = [];
            }

            $navigationGroups[$navigationGroup][] = [
                'resource' => class_basename($resource),
                'label' => $navigationLabel,
                'sort' => $navigationSort,
                'icon' => $navigationIcon ? class_basename($navigationIcon) : 'Aucune',
            ];
        }

        // Trier les groupes et les éléments
        foreach ($navigationGroups as $groupName => &$items) {
            usort($items, fn ($a, $b) => ($a['sort'] ?? 999) <=> ($b['sort'] ?? 999));
        }

        // Afficher la navigation organisée
        foreach ($navigationGroups as $groupName => $items) {
            $groupTitle = $groupName ?: '📋 Sans groupe';
            $this->line("🏷️  <fg=yellow>{$groupTitle}</fg=yellow>");

            foreach ($items as $item) {
                $sort = $item['sort'] ? "#{$item['sort']}" : '#∞';
                $this->line("  {$sort} 📄 {$item['label']} ({$item['resource']})");
                $this->line("      🎨 Icône: {$item['icon']}");
            }

            $this->newLine();
        }

        // Vérifications spécifiques pour les formations
        $this->info('🔍 Vérifications spécifiques:');

        $formationResources = array_filter($resources, function ($resource) {
            return str_contains($resource, 'Formation');
        });

        $this->line('✅ '.count($formationResources).' ressource(s) liée(s) aux formations trouvée(s)');

        // Vérifier le groupe "Formations"
        if (isset($navigationGroups['Formations'])) {
            $formationsGroup = $navigationGroups['Formations'];
            $this->line("✅ Groupe 'Formations' configuré avec ".count($formationsGroup).' élément(s)');

            // Vérifier l'ordre
            $expectedOrder = ['Catégories', 'Liste des formations'];
            $actualOrder = array_column($formationsGroup, 'label');

            if ($actualOrder === $expectedOrder) {
                $this->line('✅ Ordre correct: '.implode(' → ', $actualOrder));
            } else {
                $this->warn('⚠️  Ordre attendu: '.implode(' → ', $expectedOrder));
                $this->warn('⚠️  Ordre actuel: '.implode(' → ', $actualOrder));
            }
        } else {
            $this->error("❌ Groupe 'Formations' non trouvé");
        }

        $this->newLine();
        $this->info('✅ Test de navigation terminé');

        return 0;
    }
}
