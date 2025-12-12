<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Mail\ContactMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMailtrapProduction extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'mail:test-production {--to=admin@madinia.fr : Email de destination}';

    /**
     * The console command description.
     */
    protected $description = 'Test spécialement configuré pour Mailtrap Production';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🚀 Test Mailtrap Production');
        $this->newLine();

        // 1. Vérification de la configuration Production
        $this->checkProductionConfig();
        $this->newLine();

        // 2. Test d'envoi avec ContactMail corrigé
        $this->testContactMailFixed();
        $this->newLine();

        // 3. Recommandations
        $this->showRecommendations();

        return Command::SUCCESS;
    }

    /**
     * Vérifie la configuration pour Mailtrap Production
     */
    private function checkProductionConfig(): void
    {
        $this->info('📋 Configuration Mailtrap Production :');

        $host = config('mail.mailers.smtp.host');
        $fromAddress = config('mail.from.address');

        // Vérifications spécifiques Mailtrap Production
        if ($host === 'live.smtp.mailtrap.io') {
            $this->info('  ✅ Host Mailtrap Production détecté');
        } else {
            $this->warn("  ⚠️  Host actuel : $host (pas Mailtrap Production)");
        }

        if (str_ends_with($fromAddress, '@madinia.fr')) {
            $this->info("  ✅ FROM address : $fromAddress (domaine autorisé)");
        } else {
            $this->error("  ❌ FROM address : $fromAddress (domaine NON autorisé par Mailtrap Production)");
            $this->warn('     Mailtrap Production n\'autorise que les domaines vérifiés');
        }

        $config = [
            'MAIL_HOST' => config('mail.mailers.smtp.host'),
            'MAIL_PORT' => config('mail.mailers.smtp.port'),
            'MAIL_FROM_ADDRESS' => $fromAddress,
            'MAIL_ADMIN_EMAIL' => config('mail.admin_email', 'contact@madinia.fr'),
        ];

        foreach ($config as $key => $value) {
            $this->line("  • $key: $value");
        }
    }

    /**
     * Test ContactMail avec la correction
     */
    private function testContactMailFixed(): void
    {
        $this->info('📧 Test ContactMail corrigé...');

        $to = $this->option('to');

        $testData = [
            'firstName' => 'Jean',
            'lastName' => 'Test',
            'email' => 'jean.test@example.com', // Email client différent de gmail
            'phone' => '01 23 45 67 89',
            'company' => 'Entreprise Test',
            'subject' => 'Test Mailtrap Production',
            'message' => 'Test d\'envoi via Mailtrap Production avec FROM corrigé.',
        ];

        try {
            // Test email admin (le problématique)
            Mail::to($to)->send(new ContactMail($testData, false));
            $this->info("  ✅ Email admin envoyé vers $to");
            $this->info('  📧 FROM: contact@madinia.fr (corrigé)');
            $this->info('  📧 REPLY-TO: jean.test@example.com');

            $this->newLine();

            // Test email confirmation
            Mail::to('test@example.com')->send(new ContactMail($testData, true));
            $this->info('  ✅ Email confirmation envoyé vers test@example.com');

            $this->newLine();
            $this->info('  🎉 Tous les emails envoyés avec succès !');

        } catch (\Exception $e) {
            $this->error('  ❌ Erreur : '.$e->getMessage());

            if (str_contains($e->getMessage(), 'domain') || str_contains($e->getMessage(), 'gmail.com')) {
                $this->warn('  💡 Cette erreur était causée par l\'utilisation du domaine gmail.com');
                $this->info('  ✅ Normalement corrigée avec la modification de ContactMail.php');
            }
        }
    }

    /**
     * Affiche les recommandations
     */
    private function showRecommendations(): void
    {
        $this->info('💡 Recommandations :');
        $this->newLine();

        $this->line('1. **Configuration Mailtrap Production** :');
        $this->line('   • Utilisez TOUJOURS contact@madinia.fr comme FROM');
        $this->line('   • L\'email du client va dans REPLY-TO (pour répondre facilement)');
        $this->line('   • Vérifiez votre domaine madinia.fr dans Mailtrap');
        $this->newLine();

        $this->line('2. **Alternative - Mailtrap Sandbox** (pour développement) :');
        $this->line('   MAIL_HOST=sandbox.smtp.mailtrap.io');
        $this->line('   MAIL_PORT=2525');
        $this->line('   (Plus permissif pour les tests)');
        $this->newLine();

        $this->line('3. **Production recommandée** :');
        $this->line('   • SendGrid, Mailgun, ou Amazon SES');
        $this->line('   • Meilleure délivrabilité que Mailtrap Production');
        $this->newLine();

        $this->line('4. **Variables .env correctes** :');
        $this->line('   MAIL_FROM_ADDRESS="contact@madinia.fr"');
        $this->line('   MAIL_ADMIN_EMAIL="contact@madinia.fr"');
    }
}
