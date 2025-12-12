<?php

declare(strict_types=1);

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class FixSupabaseCredentials extends Command
{
    protected $signature = 'supabase:fix-credentials {--test : Tester la configuration sans modifications}';

    protected $description = 'Corrige et teste les credentials Supabase';

    public function handle(): int
    {
        $this->info('🔧 Correction des credentials Supabase');
        $this->newLine();

        $isTest = $this->option('test');

        if ($isTest) {
            $this->warn('🔍 Mode TEST - Aucune modification ne sera appliquée');
            $this->newLine();
        }

        // 1. Vérifier la configuration actuelle
        $this->info('📋 Configuration actuelle:');
        $config = config('filesystems.disks.supabase');

        $checks = [
            'Access Key ID' => $config['key'] ?? null,
            'Secret Access Key' => $config['secret'] ? 'DÉFINI' : 'MANQUANT',
            'Region' => $config['region'] ?? null,
            'Bucket' => $config['bucket'] ?? null,
            'Endpoint' => $config['endpoint'] ?? null,
            'Project Ref' => $config['project_ref'] ?? null,
        ];

        foreach ($checks as $label => $value) {
            $status = $value ? '✅' : '❌';
            $this->line("  {$status} {$label}: {$value}");
        }

        $this->newLine();

        // 2. Valeurs recommandées
        $recommended = [
            'SUPABASE_ACCESS_KEY_ID' => 'f4eb3530f36d8926575b475c62adde14',
            'SUPABASE_SECRET_ACCESS_KEY' => '0601e2c13af5306efefa82010991f57cbdb80af6cb8a4faf5bc3e459534b2dd8',
            'SUPABASE_DEFAULT_REGION' => 'us-east-2',
            'SUPABASE_BUCKET' => 'formations',
            'SUPABASE_PROJECT_REF' => 'rrgxotnrwmjqnaugllks',
            'SUPABASE_URL' => 'https://rrgxotnrwmjqnaugllks.supabase.co/storage/v1/s3',
            'SUPABASE_ENDPOINT' => 'https://rrgxotnrwmjqnaugllks.storage.supabase.co/storage/v1/s3',
        ];

        $this->info('💡 Valeurs recommandées pour .env:');
        foreach ($recommended as $key => $value) {
            $this->line("  {$key}={$value}");
        }

        $this->newLine();

        // 3. Test de connexion
        $this->info('🔗 Test de connexion:');
        try {
            $disk = Storage::disk('supabase');
            $files = $disk->files('formations');
            $this->line('  ✅ Connexion réussie - '.count($files).' fichiers dans le bucket');

            // Test d'écriture si pas en mode test
            if (! $isTest) {
                $testContent = 'Test de connexion - '.now()->toDateTimeString();
                $testFile = 'test-connection-'.time().'.txt';

                $disk->put($testFile, $testContent);
                $this->line("  ✅ Test d'écriture réussi: {$testFile}");

                // Nettoyer le fichier de test
                $disk->delete($testFile);
                $this->line('  🧹 Fichier de test supprimé');
            }
        } catch (\Exception $e) {
            $this->error('  ❌ Erreur de connexion: '.$e->getMessage());
            $this->newLine();

            $this->warn('🚨 Actions requises:');
            $this->line('  1. Vérifiez les variables d\'environnement en production');
            $this->line('  2. Redémarrez l\'application après modification');
            $this->line('  3. Vérifiez les permissions du bucket Supabase');

            return 1;
        }

        // 4. Vérification des URLs publiques
        $this->info('🌐 Test des URLs publiques:');
        if (! empty($files)) {
            $sampleFile = $files[0];
            $publicUrl = "https://rrgxotnrwmjqnaugllks.supabase.co/storage/v1/object/public/formations/{$sampleFile}";
            $this->line("  📄 Fichier: {$sampleFile}");
            $this->line("  🔗 URL: {$publicUrl}");
        }

        $this->newLine();

        // 5. Recommandations
        $this->info('📝 Recommandations:');
        if (app()->environment('production')) {
            $this->line('  🏭 Environnement de production détecté');
            $this->line('  ⚠️  Assurez-vous que les variables sont définies dans Laravel Cloud');
            $this->line('  🔄 Redémarrez l\'application après modification des variables');
        } else {
            $this->line('  🧪 Environnement de développement');
            $this->line('  📝 Vérifiez le fichier .env local');
        }

        $this->newLine();
        $this->info('✅ Diagnostic terminé');

        if (! $isTest) {
            $this->line('🎯 Configuration Supabase opérationnelle');
        }

        return 0;
    }
}
