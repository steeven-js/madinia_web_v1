<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Mail\ContactMail;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TestMailConfiguration extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'mail:test-config {--to=test@example.com : Email de destination pour le test}';

    /**
     * The console command description.
     */
    protected $description = 'Test la configuration email et l\'envoi vers Mailtrap';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🔍 Diagnostic de la configuration email');
        $this->newLine();

        // 1. Vérification de la configuration
        $this->checkMailConfiguration();
        $this->newLine();

        // 2. Test de connexion SMTP
        $this->testSmtpConnection();
        $this->newLine();

        // 3. Test d'envoi simple
        $this->testSimpleEmail();
        $this->newLine();

        // 4. Test avec ContactMail
        $this->testContactMail();
        $this->newLine();

        $this->info('✅ Diagnostic terminé. Vérifiez votre boîte Mailtrap !');

        return Command::SUCCESS;
    }

    /**
     * Vérifie la configuration mail
     */
    private function checkMailConfiguration(): void
    {
        $this->info('📋 Configuration actuelle :');

        $config = [
            'MAIL_MAILER' => config('mail.default'),
            'MAIL_HOST' => config('mail.mailers.smtp.host'),
            'MAIL_PORT' => config('mail.mailers.smtp.port'),
            'MAIL_USERNAME' => config('mail.mailers.smtp.username') ? '***configuré***' : 'NON CONFIGURÉ',
            'MAIL_PASSWORD' => config('mail.mailers.smtp.password') ? '***configuré***' : 'NON CONFIGURÉ',
            'MAIL_FROM_ADDRESS' => config('mail.from.address'),
            'MAIL_FROM_NAME' => config('mail.from.name'),
        ];

        foreach ($config as $key => $value) {
            $status = ($key === 'MAIL_USERNAME' || $key === 'MAIL_PASSWORD')
                ? ($value === 'NON CONFIGURÉ' ? '❌' : '✅')
                : (empty($value) ? '❌' : '✅');

            $this->line("  $status $key: $value");
        }

        // Vérifications spéciales
        if (config('mail.default') !== 'smtp') {
            $this->warn('⚠️  MAIL_MAILER n\'est pas configuré sur "smtp"');
        }

        if (config('mail.mailers.smtp.host') !== 'sandbox.smtp.mailtrap.io') {
            $this->warn('⚠️  MAIL_HOST ne pointe pas vers Mailtrap');
        }
    }

    /**
     * Test de connexion SMTP
     */
    private function testSmtpConnection(): void
    {
        $this->info('🔌 Test de connexion SMTP...');

        try {
            $transport = Mail::getSwiftMailer()->getTransport();

            if (method_exists($transport, 'start')) {
                $transport->start();
                $this->info('  ✅ Connexion SMTP réussie');
            } else {
                $this->info('  ℹ️  Transport ne supporte pas le test de connexion direct');
            }

        } catch (\Exception $e) {
            $this->error('  ❌ Erreur de connexion SMTP : '.$e->getMessage());
            $this->warn('  💡 Vérifiez vos identifiants Mailtrap dans le .env');
        }
    }

    /**
     * Test d'envoi d'email simple
     */
    private function testSimpleEmail(): void
    {
        $this->info('📧 Test d\'envoi d\'email simple...');

        $to = $this->option('to');

        try {
            Mail::raw('Ceci est un email de test envoyé depuis Laravel.', function ($message) use ($to) {
                $message->to($to)
                    ->subject('[TEST] Email de diagnostic Laravel')
                    ->from(config('mail.from.address'), config('mail.from.name'));
            });

            $this->info("  ✅ Email simple envoyé vers $to");
            $this->info('  📦 Vérifiez votre boîte Mailtrap !');

        } catch (\Exception $e) {
            $this->error('  ❌ Erreur d\'envoi : '.$e->getMessage());

            // Log détaillé de l'erreur
            Log::error('Erreur test email simple', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'to' => $to,
            ]);
        }
    }

    /**
     * Test avec la classe ContactMail
     */
    private function testContactMail(): void
    {
        $this->info('📬 Test avec ContactMail...');

        $to = $this->option('to');

        $testData = [
            'firstName' => 'Jean',
            'lastName' => 'Test',
            'email' => $to,
            'phone' => '01 23 45 67 89',
            'company' => 'Entreprise Test',
            'subject' => 'Test du formulaire de contact',
            'message' => 'Ceci est un message de test envoyé depuis la commande de diagnostic Laravel.',
        ];

        try {
            // Test email admin
            Mail::to($to)->send(new ContactMail($testData, false));
            $this->info("  ✅ Email admin envoyé vers $to");

            // Test email confirmation
            Mail::to($to)->send(new ContactMail($testData, true));
            $this->info("  ✅ Email confirmation envoyé vers $to");

            $this->info('  📦 Vérifiez votre boîte Mailtrap pour 2 emails !');

        } catch (\Exception $e) {
            $this->error('  ❌ Erreur ContactMail : '.$e->getMessage());

            // Log détaillé de l'erreur
            Log::error('Erreur test ContactMail', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $testData,
            ]);
        }
    }
}
