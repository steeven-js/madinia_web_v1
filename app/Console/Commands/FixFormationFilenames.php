<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class FixFormationFilenames extends Command
{
    protected $signature = 'formations:fix-filenames {--dry-run : Simuler les corrections sans les appliquer}';

    protected $description = 'Corrige les noms de fichiers problématiques des formations';

    public function handle(): int
    {
        $this->info('🔧 Correction des noms de fichiers problématiques');
        $this->newLine();

        $isDryRun = $this->option('dry-run');

        if ($isDryRun) {
            $this->warn('🔍 Mode DRY-RUN : Aucune modification ne sera appliquée');
            $this->newLine();
        }

        $formations = Formation::whereNotNull('pdf_file')
            ->orWhereNotNull('image')
            ->get();

        $this->info("📊 Examen de {$formations->count()} formations avec fichiers");
        $this->newLine();

        $fixedCount = 0;
        $disk = Storage::disk('supabase');

        foreach ($formations as $formation) {
            $needsUpdate = false;
            $updates = [];

            // Vérifier et corriger le PDF
            if ($formation->pdf_file && $this->hasProblematicCharacters($formation->pdf_file)) {
                $newPdfName = $this->sanitizeFilename($formation->pdf_file);
                $this->line("📄 Formation ID {$formation->id}: {$formation->title}");
                $this->line("  PDF: {$formation->pdf_file} → {$newPdfName}");

                if (! $isDryRun) {
                    // Essayer de renommer le fichier s'il existe
                    try {
                        if ($disk->exists($formation->pdf_file)) {
                            $disk->move($formation->pdf_file, $newPdfName);
                            $this->line('  ✅ Fichier renommé sur Supabase');
                        } else {
                            $this->line('  ⚠️  Fichier original non trouvé sur Supabase');
                        }
                    } catch (\Exception $e) {
                        $this->line('  ❌ Erreur lors du renommage: '.$e->getMessage());
                        // Continuer avec la mise à jour de la base même si le renommage échoue
                    }

                    $updates['pdf_file'] = $newPdfName;
                }

                $needsUpdate = true;
            }

            // Vérifier et corriger l'image
            if ($formation->image && $this->hasProblematicCharacters($formation->image)) {
                $newImageName = $this->sanitizeFilename($formation->image);
                $this->line("🖼️  Image: {$formation->image} → {$newImageName}");

                if (! $isDryRun) {
                    try {
                        if ($disk->exists($formation->image)) {
                            $disk->move($formation->image, $newImageName);
                            $this->line('  ✅ Image renommée sur Supabase');
                        } else {
                            $this->line('  ⚠️  Image originale non trouvée sur Supabase');
                        }
                    } catch (\Exception $e) {
                        $this->line('  ❌ Erreur lors du renommage: '.$e->getMessage());
                    }

                    $updates['image'] = $newImageName;
                }

                $needsUpdate = true;
            }

            // Mettre à jour la base de données
            if ($needsUpdate && ! $isDryRun && ! empty($updates)) {
                $formation->update($updates);
                $this->line('  ✅ Base de données mise à jour');
                $fixedCount++;
            } elseif ($needsUpdate) {
                $fixedCount++;
            }

            if ($needsUpdate) {
                $this->newLine();
            }
        }

        $this->newLine();

        if ($isDryRun) {
            $this->info("🔍 {$fixedCount} formation(s) nécessitent une correction");
            $this->line('🎯 Exécutez sans --dry-run pour appliquer les corrections');
        } else {
            $this->info("✅ {$fixedCount} formation(s) corrigée(s)");
            $this->line('🎯 Les noms de fichiers sont maintenant compatibles avec Supabase');
        }

        return 0;
    }

    private function hasProblematicCharacters(string $filename): bool
    {
        // Caractères problématiques pour S3/Supabase
        $problematicChars = [' ', "'", 'é', 'è', 'à', 'ç', 'ô', 'î', 'ê', 'ù', 'â', 'É', 'È', 'À', 'Ç', 'Ô', 'Î', 'Ê', 'Ù', 'Â'];

        foreach ($problematicChars as $char) {
            if (str_contains($filename, $char)) {
                return true;
            }
        }

        return false;
    }

    private function sanitizeFilename(string $filename): string
    {
        // Séparer le nom et l'extension
        $pathInfo = pathinfo($filename);
        $directory = $pathInfo['dirname'] !== '.' ? $pathInfo['dirname'].'/' : '';
        $name = $pathInfo['filename'];
        $extension = isset($pathInfo['extension']) ? '.'.$pathInfo['extension'] : '';

        // Nettoyer le nom de fichier
        $cleanName = $this->cleanString($name);

        // Reconstruire le chemin complet
        $cleanFilename = $directory.$cleanName.$extension;

        // S'assurer qu'il n'y a pas de double slashes
        return str_replace('//', '/', $cleanFilename);
    }

    private function cleanString(string $string): string
    {
        // Remplacer les caractères accentués
        $string = $this->removeAccents($string);

        // Remplacer les espaces et caractères spéciaux par des tirets
        $string = preg_replace('/[^a-zA-Z0-9\-_.]/', '-', $string);

        // Supprimer les tirets multiples
        $string = preg_replace('/-+/', '-', $string);

        // Supprimer les tirets en début et fin
        $string = trim($string, '-');

        return $string;
    }

    private function removeAccents(string $string): string
    {
        $accents = [
            'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a',
            'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e',
            'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i',
            'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o', 'ö' => 'o',
            'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ü' => 'u',
            'ç' => 'c', 'ñ' => 'n',
            'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A',
            'È' => 'E', 'É' => 'E', 'Ê' => 'E', 'Ë' => 'E',
            'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I',
            'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O',
            'Ù' => 'U', 'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U',
            'Ç' => 'C', 'Ñ' => 'N',
        ];

        return strtr($string, $accents);
    }
}
