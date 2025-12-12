<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Helpers\SupabaseHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DiagnoseSupabaseProduction extends Command
{
    protected $signature = 'supabase:diagnose-production';

    protected $description = 'Diagnostique la configuration Supabase en production';

    public function handle(): int
    {
        $this->info('🔍 Diagnostic Supabase Production');
        $this->newLine();

        // 1. Vérifier les variables d'environnement
        $this->info('📋 Variables d\'environnement:');
        $vars = [
            'SUPABASE_ACCESS_KEY_ID' => config('filesystems.disks.supabase.key'),
            'SUPABASE_SECRET_ACCESS_KEY' => config('filesystems.disks.supabase.secret') ? 'DÉFINI ('.strlen(config('filesystems.disks.supabase.secret')).' chars)' : 'MANQUANT',
            'SUPABASE_REGION' => config('filesystems.disks.supabase.region'),
            'SUPABASE_BUCKET' => config('filesystems.disks.supabase.bucket'),
            'SUPABASE_PROJECT_REF' => config('filesystems.disks.supabase.project_ref'),
            'SUPABASE_ENDPOINT' => config('filesystems.disks.supabase.endpoint'),
        ];

        foreach ($vars as $key => $value) {
            $status = $value ? '✅' : '❌';
            $this->line("  {$status} {$key}: {$value}");
        }

        $this->newLine();

        // 2. Vérifier les variables manquantes
        $missing = [];
        if (! config('filesystems.disks.supabase.key')) {
            $missing[] = 'SUPABASE_ACCESS_KEY_ID';
        }
        if (! config('filesystems.disks.supabase.secret')) {
            $missing[] = 'SUPABASE_SECRET_ACCESS_KEY';
        }
        if (! config('filesystems.disks.supabase.bucket')) {
            $missing[] = 'SUPABASE_BUCKET';
        }
        if (! config('filesystems.disks.supabase.project_ref')) {
            $missing[] = 'SUPABASE_PROJECT_REF';
        }

        if (! empty($missing)) {
            $this->error('❌ Variables manquantes: '.implode(', ', $missing));
            $this->newLine();
            $this->warn('⚠️  Ajoutez ces variables dans votre .env en production:');
            foreach ($missing as $var) {
                $this->line("  {$var}=your_value_here");
            }

            return 1;
        }

        // 3. Test de connexion
        $this->info('🔗 Test de connexion Supabase:');
        try {
            $disk = Storage::disk('supabase');

            // Test simple d'existence
            $this->line('  📁 Test d\'accès au bucket...');
            $files = $disk->files('formations/images');
            $this->line('  ✅ Connexion réussie - '.count($files).' fichiers trouvés');

            // Afficher quelques fichiers
            if (count($files) > 0) {
                $this->line('  📄 Exemples de fichiers:');
                foreach (array_slice($files, 0, 3) as $file) {
                    $this->line("    • {$file}");
                }
            }
        } catch (\Exception $e) {
            $this->error('  ❌ Erreur de connexion: '.$e->getMessage());
            $this->newLine();
            $this->warn('💡 Solutions possibles:');
            $this->line('  1. Vérifier les clés Supabase dans le dashboard');
            $this->line('  2. Régénérer les clés S3 si expirées');
            $this->line('  3. Vérifier les permissions du bucket');

            return 1;
        }

        $this->newLine();

        // 4. Test de génération d'URL
        $this->info('🔗 Test génération URL publique:');
        $testUrl = SupabaseHelper::getPublicUrl('formations/images/test.jpg');
        $this->line("  URL générée: {$testUrl}");

        // 5. Test avec un vrai fichier si disponible
        if (! empty($files)) {
            $realFile = $files[0];
            $realUrl = SupabaseHelper::getPublicUrl($realFile);
            $this->line("  URL réelle: {$realUrl}");
        }

        $this->newLine();

        // 6. Informations sur l'environnement
        $this->info('🌍 Informations environnement:');
        $this->line('  Environment: '.app()->environment());
        $this->line('  Laravel version: '.app()->version());
        $this->line('  PHP version: '.PHP_VERSION);

        $this->newLine();
        $this->info('✅ Diagnostic terminé avec succès');
        $this->line('🎯 La configuration Supabase semble correcte');

        return 0;
    }
}
