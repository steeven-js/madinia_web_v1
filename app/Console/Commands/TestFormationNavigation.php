<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;

class TestFormationNavigation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'formations:test-navigation {formation_id? : ID de la formation pour tester la navigation}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Teste la navigation suivant/précédent entre les formations';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $formationId = $this->argument('formation_id');

        $this->info('🧭 Test de navigation entre formations');
        $this->newLine();

        if ($formationId) {
            $formation = Formation::find($formationId);
            if (! $formation) {
                $this->error("❌ Formation avec ID {$formationId} non trouvée");

                return 1;
            }

            $this->testNavigationForFormation($formation);
        } else {
            $this->testNavigationForAllFormations();
        }

        return 0;
    }

    private function testNavigationForFormation(Formation $formation): void
    {
        $this->info("📚 Formation testée: {$formation->title}");
        $this->line("   ID: {$formation->id} | Ordre: {$formation->order}");
        $this->newLine();

        // Test précédent
        $previousId = $this->getPreviousRecordId($formation);
        if ($previousId) {
            $previous = Formation::find($previousId);
            $this->line("⬅️  Précédent: {$previous->title} (ID: {$previousId}, Ordre: {$previous->order})");
        } else {
            $this->line('⬅️  Précédent: Aucun (première formation)');
        }

        // Test suivant
        $nextId = $this->getNextRecordId($formation);
        if ($nextId) {
            $next = Formation::find($nextId);
            $this->line("➡️  Suivant: {$next->title} (ID: {$nextId}, Ordre: {$next->order})");
        } else {
            $this->line('➡️  Suivant: Aucun (dernière formation)');
        }

        $this->newLine();

        // URLs de navigation
        $this->info('🔗 URLs de navigation:');
        if ($previousId) {
            $this->line("   Précédent: /admin/formations/{$previousId}/edit");
        }
        if ($nextId) {
            $this->line("   Suivant: /admin/formations/{$nextId}/edit");
        }
    }

    private function testNavigationForAllFormations(): void
    {
        $formations = Formation::orderBy('order')->get();

        $this->info("📊 Test de navigation pour toutes les formations ({$formations->count()})");
        $this->newLine();

        $this->table(
            ['Ordre', 'ID', 'Titre', 'Précédent', 'Suivant'],
            $formations->map(function ($formation) {
                $previousId = $this->getPreviousRecordId($formation);
                $nextId = $this->getNextRecordId($formation);

                return [
                    $formation->order,
                    $formation->id,
                    substr($formation->title, 0, 40).'...',
                    $previousId ? "ID: {$previousId}" : 'Aucun',
                    $nextId ? "ID: {$nextId}" : 'Aucun',
                ];
            })->toArray()
        );

        $this->newLine();
        $this->info("✅ Navigation testée pour {$formations->count()} formations");

        // Vérifications
        $firstFormation = $formations->first();
        $lastFormation = $formations->last();

        if ($firstFormation && ! $this->getPreviousRecordId($firstFormation)) {
            $this->line("✅ Première formation n'a pas de précédent");
        }

        if ($lastFormation && ! $this->getNextRecordId($lastFormation)) {
            $this->line("✅ Dernière formation n'a pas de suivant");
        }
    }

    private function getPreviousRecordId(Formation $formation): ?int
    {
        return (int) (Formation::query()
            ->where('order', '<', $formation->order)
            ->orderBy('order', 'desc')
            ->value('id') ?? 0) ?: null;
    }

    private function getNextRecordId(Formation $formation): ?int
    {
        return (int) (Formation::query()
            ->where('order', '>', $formation->order)
            ->orderBy('order', 'asc')
            ->value('id') ?? 0) ?: null;
    }
}
