<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DebugFormationFiles extends Command
{
    protected $signature = 'formations:debug-files {formation_id? : ID de la formation à examiner}';

    protected $description = 'Debug les fichiers des formations pour identifier les problèmes';

    public function handle(): int
    {
        $formationId = $this->argument('formation_id');

        $this->info('🔍 Debug des fichiers de formations');
        $this->newLine();

        if ($formationId) {
            $this->debugSpecificFormation((int) $formationId);
        } else {
            $this->debugAllFormations();
        }

        return 0;
    }

    private function debugSpecificFormation(int $id): void
    {
        $formation = Formation::find($id);

        if (! $formation) {
            $this->error("❌ Formation avec ID {$id} non trouvée");

            return;
        }

        $this->info("📚 Formation ID: {$formation->id}");
        $this->line("   Titre: {$formation->title}");
        $this->line('   Image: '.($formation->image ?: 'AUCUNE'));
        $this->line('   PDF: '.($formation->pdf_file ?: 'AUCUN'));
        $this->newLine();

        // Test des fichiers
        if ($formation->image) {
            $this->testFile('Image', $formation->image);
        }

        if ($formation->pdf_file) {
            $this->testFile('PDF', $formation->pdf_file);
        }
    }

    private function debugAllFormations(): void
    {
        $formations = Formation::all();
        $this->info("📊 Examen de {$formations->count()} formations");
        $this->newLine();

        $problematicFiles = [];

        foreach ($formations as $formation) {
            $issues = [];

            if ($formation->image && $this->hasFileIssues($formation->image)) {
                $issues[] = 'Image: '.$formation->image;
            }

            if ($formation->pdf_file && $this->hasFileIssues($formation->pdf_file)) {
                $issues[] = 'PDF: '.$formation->pdf_file;
            }

            if (! empty($issues)) {
                $problematicFiles[] = [
                    'id' => $formation->id,
                    'title' => $formation->title,
                    'issues' => $issues,
                ];
            }
        }

        if (empty($problematicFiles)) {
            $this->info('✅ Aucun problème de fichier détecté');
        } else {
            $this->warn("⚠️  {count($problematicFiles)} formation(s) avec des problèmes de fichiers:");
            foreach ($problematicFiles as $problem) {
                $this->line("  📚 ID {$problem['id']}: {$problem['title']}");
                foreach ($problem['issues'] as $issue) {
                    $this->line("    ❌ {$issue}");
                }
            }
        }
    }

    private function testFile(string $type, string $filePath): void
    {
        $this->line("🔍 Test {$type}: {$filePath}");

        // Vérifier les caractères problématiques
        $problematicChars = $this->findProblematicCharacters($filePath);
        if (! empty($problematicChars)) {
            $this->warn('  ⚠️  Caractères problématiques détectés: '.implode(', ', $problematicChars));
        }

        // Test d'existence
        try {
            $disk = Storage::disk('supabase');
            $exists = $disk->exists($filePath);
            $status = $exists ? '✅ Existe' : '❌ N\'existe pas';
            $this->line("  {$status}");

            if ($exists) {
                $size = $disk->size($filePath);
                $this->line('  📏 Taille: '.$this->formatBytes($size));
            }
        } catch (\Exception $e) {
            $this->error('  ❌ Erreur lors du test: '.$e->getMessage());
        }

        $this->newLine();
    }

    private function hasFileIssues(string $filePath): bool
    {
        // Vérifier les caractères problématiques
        $problematicChars = $this->findProblematicCharacters($filePath);

        return ! empty($problematicChars);
    }

    private function findProblematicCharacters(string $filePath): array
    {
        $problematic = [];

        // Caractères qui peuvent poser problème avec S3/Supabase
        $problematicPatterns = [
            'espaces' => ' ',
            'apostrophes' => "'",
            'accents_é' => 'é',
            'accents_è' => 'è',
            'accents_à' => 'à',
            'accents_ç' => 'ç',
            'accents_ô' => 'ô',
            'accents_î' => 'î',
            'accents_ê' => 'ê',
            'accents_ù' => 'ù',
            'accents_â' => 'â',
        ];

        foreach ($problematicPatterns as $name => $char) {
            if (str_contains($filePath, $char)) {
                $problematic[] = $name;
            }
        }

        return $problematic;
    }

    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2).' '.$units[$pow];
    }
}
