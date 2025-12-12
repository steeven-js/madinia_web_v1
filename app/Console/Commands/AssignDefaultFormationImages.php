<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class AssignDefaultFormationImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'formations:assign-default-images {--dry-run : Afficher les changements sans les appliquer}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assigne des images par défaut aux formations qui n\'en ont pas';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $isDryRun = $this->option('dry-run');

        $this->info('🖼️  Attribution d\'images par défaut aux formations');
        $this->newLine();

        if ($isDryRun) {
            $this->warn('🔍 Mode DRY-RUN : Aucune modification ne sera appliquée');
            $this->newLine();
        }

        // Images disponibles dans le dossier course
        $availableImages = [
            'course/course-1.webp',
            'course/course-2.webp',
            'course/course-3.webp',
            'course/course-4.webp',
            'course/course-5.webp',
            'course/course-6.webp',
            'course/course-7.webp',
            'course/course-8.webp',
            'course/course-9.webp',
            'course/course-10.webp',
            'course/course-11.webp',
            'course/course-12.webp',
            'course/course-13.webp',
        ];

        // Récupérer les formations sans image
        $formations = Formation::whereNull('image')->orWhere('image', '')->get();

        if ($formations->isEmpty()) {
            $this->info('✅ Toutes les formations ont déjà une image assignée !');

            return 0;
        }

        $this->info("📚 {$formations->count()} formation(s) sans image trouvée(s)");
        $this->newLine();

        $imageIndex = 0;
        $updated = 0;

        foreach ($formations as $formation) {
            // Sélectionner une image de manière cyclique
            $selectedImage = $availableImages[$imageIndex % count($availableImages)];

            $this->line(sprintf(
                '• <comment>%s</comment>',
                str_pad(substr($formation->title, 0, 60), 62)
            ));

            $this->line(sprintf(
                '  → Image: <info>%s</info>',
                $selectedImage
            ));

            if (! $isDryRun) {
                // Uploader l'image vers Supabase
                $localImagePath = public_path("assets/images/{$selectedImage}");

                if (file_exists($localImagePath)) {
                    try {
                        // Générer un nom unique pour l'image
                        $extension = pathinfo($selectedImage, PATHINFO_EXTENSION);
                        $uniqueName = 'formations/images/'.uniqid().'.'.$extension;

                        // Uploader vers Supabase
                        $imageContent = file_get_contents($localImagePath);
                        Storage::disk('supabase')->put($uniqueName, $imageContent);

                        // Mettre à jour la formation
                        $formation->update(['image' => $uniqueName]);

                        $this->line('  ✅ <fg=green>Image uploadée et assignée</fg=green>');
                        $updated++;
                    } catch (\Exception $e) {
                        $this->line('  ❌ <fg=red>Erreur: '.$e->getMessage().'</fg=red>');
                    }
                } else {
                    $this->line('  ⚠️  <fg=yellow>Image locale non trouvée</fg=yellow>');
                }
            } else {
                $this->line('  🔍 <fg=yellow>Serait assignée (dry-run)</fg=yellow>');
            }

            $this->newLine();
            $imageIndex++;
        }

        if (! $isDryRun) {
            $this->info("✅ {$updated} formation(s) mise(s) à jour avec des images par défaut");
            $this->info('🎯 Les images sont maintenant visibles dans l\'interface Filament');
        } else {
            $this->info('🔍 Exécutez sans --dry-run pour appliquer les changements');
        }

        return 0;
    }
}
