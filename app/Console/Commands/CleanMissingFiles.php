<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanMissingFiles extends Command
{
    protected $signature = 'formations:clean-missing-files {--dry-run : Simuler le nettoyage sans appliquer les modifications}';

    protected $description = 'Nettoie les références de fichiers inexistants dans la base de données';

    public function handle(): int
    {
        $this->info('🧹 Nettoyage des références de fichiers inexistants');
        $this->newLine();

        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->warn('🔍 Mode DRY-RUN : Aucune modification ne sera appliquée');
            $this->newLine();
        }

        $formations = Formation::whereNotNull('pdf_file')
            ->orWhereNotNull('image')
            ->get();

        $this->info("📊 Vérification de {$formations->count()} formations avec fichiers");
        $this->newLine();

        $cleanedCount = 0;
        $disk = Storage::disk('supabase');

        foreach ($formations as $formation) {
            $needsUpdate = false;
            $updates = [];

            $this->line("📚 Formation ID {$formation->id}: {$formation->title}");

            // Vérifier le PDF
            if ($formation->pdf_file) {
                try {
                    if (! $disk->exists($formation->pdf_file)) {
                        $this->line("  ❌ PDF inexistant: {$formation->pdf_file}");
                        if (! $isDryRun) {
                            $updates['pdf_file'] = null;
                        }
                        $needsUpdate = true;
                    } else {
                        $this->line("  ✅ PDF trouvé: {$formation->pdf_file}");
                    }
                } catch (\Exception $e) {
                    $this->line("  ❌ Erreur lors de la vérification PDF: {$e->getMessage()}");
                    if (! $isDryRun) {
                        $updates['pdf_file'] = null;
                    }
                    $needsUpdate = true;
                }
            }

            // Vérifier l'image
            if ($formation->image) {
                try {
                    if (! $disk->exists($formation->image)) {
                        $this->line("  ❌ Image inexistante: {$formation->image}");
                        if (! $isDryRun) {
                            $updates['image'] = null;
                        }
                        $needsUpdate = true;
                    } else {
                        $this->line("  ✅ Image trouvée: {$formation->image}");
                    }
                } catch (\Exception $e) {
                    $this->line("  ❌ Erreur lors de la vérification image: {$e->getMessage()}");
                    if (! $isDryRun) {
                        $updates['image'] = null;
                    }
                    $needsUpdate = true;
                }
            }

            // Mettre à jour la base de données
            if ($needsUpdate && ! $isDryRun && ! empty($updates)) {
                $formation->update($updates);
                $this->line('  ✅ Références nettoyées dans la base de données');
                $cleanedCount++;
            } elseif ($needsUpdate) {
                $cleanedCount++;
            }

            if (! $needsUpdate) {
                $this->line('  ✅ Tous les fichiers sont présents');
            }

            $this->newLine();
        }

        if ($isDryRun) {
            $this->info("🔍 {$cleanedCount} formation(s) nécessitent un nettoyage");
            $this->line('🎯 Exécutez sans --dry-run pour appliquer les modifications');
        } else {
            $this->info("✅ {$cleanedCount} formation(s) nettoyée(s)");
            $this->line('🎯 Les références de fichiers inexistants ont été supprimées');
        }

        return 0;
    }
}
