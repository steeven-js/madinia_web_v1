<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Helpers\SupabaseHelper;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class TestSupabaseConfig extends Command
{
    protected $signature = 'test:supabase';

    protected $description = 'Test la configuration Supabase Storage';

    public function handle(): int
    {
        $this->info('🔍 Vérification de la configuration Supabase Storage...');
        $this->newLine();

        // Test des variables d'environnement
        $this->info('📋 Variables d\'environnement :');
        $this->line('-------------------------------------');

        $config = [
            'SUPABASE_PROJECT_REF' => config('filesystems.disks.supabase.project_ref'),
            'SUPABASE_BUCKET' => config('filesystems.disks.supabase.bucket'),
            'SUPABASE_REGION' => config('filesystems.disks.supabase.region'),
            'SUPABASE_ENDPOINT' => config('filesystems.disks.supabase.endpoint'),
            'SUPABASE_ACCESS_KEY' => config('filesystems.disks.supabase.key') ? '✅ Défini' : '❌ Manquant',
            'SUPABASE_SECRET_KEY' => config('filesystems.disks.supabase.secret') ? '✅ Défini' : '❌ Manquant',
        ];

        $allConfigured = true;
        foreach ($config as $key => $value) {
            if (empty($value) && $key !== 'SUPABASE_ACCESS_KEY' && $key !== 'SUPABASE_SECRET_KEY') {
                $this->error("  ❌ {$key}: NULL ou vide");
                $allConfigured = false;
            } else {
                $this->line("  ✅ {$key}: {$value}");
            }
        }

        $this->newLine();

        // Test du Helper
        $this->info('🔗 Test du Helper SupabaseHelper :');
        $this->line('-------------------------------------');

        $testPath = 'formations/images/test.jpg';
        $generatedUrl = SupabaseHelper::getPublicUrl($testPath);

        if ($generatedUrl) {
            $this->line("  ✅ URL générée : {$generatedUrl}");
        } else {
            $this->error("  ❌ Impossible de générer l'URL (vérifiez SUPABASE_PROJECT_REF)");
            $allConfigured = false;
        }

        $this->newLine();

        // Test de connexion au disk
        $this->info('💾 Test de connexion au disk Supabase :');
        $this->line('-------------------------------------');

        try {
            $disk = Storage::disk('supabase');
            $this->line('  ✅ Disk Supabase chargé');

            // Test de listage (si possible)
            try {
                $files = $disk->files('formations/images');
                $this->line('  ✅ Connexion réussie au bucket');
                $this->line('  📁 Fichiers trouvés : '.count($files));

                if (count($files) > 0) {
                    $this->line('  📄 Exemples :');
                    foreach (array_slice($files, 0, 3) as $file) {
                        $url = SupabaseHelper::getPublicUrl($file);
                        $this->line("     - {$file}");
                        $this->line("       URL : {$url}");
                    }
                }
            } catch (\Exception $e) {
                $this->error('  ❌ Erreur lors du listage : '.$e->getMessage());
                $allConfigured = false;
            }
        } catch (\Exception $e) {
            $this->error('  ❌ Impossible de charger le disk : '.$e->getMessage());
            $allConfigured = false;
        }

        $this->newLine();

        // Résultat final
        if ($allConfigured) {
            $this->info('✅ Configuration Supabase Storage : OK');
            $this->newLine();
            $this->info('📝 Prochaines étapes :');
            $this->line('  1. Testez un upload d\'image dans Filament');
            $this->line('  2. Vérifiez que l\'image s\'affiche dans la liste');
            $this->line('  3. Testez un upload de PDF');
            $this->line('  4. Vérifiez que le lien PDF fonctionne');

            return 0;
        } else {
            $this->error('❌ Configuration incomplète !');
            $this->newLine();
            $this->warn('📋 Actions requises :');
            $this->line('  1. Ajoutez SUPABASE_PROJECT_REF dans .env');
            $this->line('  2. Vérifiez toutes les variables Supabase');
            $this->line('  3. Exécutez : php artisan config:clear');
            $this->line('  4. Relancez ce test : php artisan test:supabase');
            $this->newLine();
            $this->line('📖 Voir : docs/ENV_SUPABASE_COMPLETE.md');

            return 1;
        }
    }
}
