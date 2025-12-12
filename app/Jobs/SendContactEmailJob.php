<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Mail\ContactMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendContactEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * The number of times the job may be attempted.
     */
    public int $tries = 3;

    /**
     * The number of seconds to wait before retrying the job.
     */
    public int $backoff = 30;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public array $contactData,
        public string $recipient,
        public bool $isConfirmation = false
    ) {
        // Délai de 2 secondes entre les emails pour éviter le rate limiting
        $this->delay = now()->addSeconds($isConfirmation ? 2 : 0);
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Mail::to($this->recipient)->send(new ContactMail($this->contactData, $this->isConfirmation));

            Log::info('Email de contact envoyé avec succès', [
                'recipient' => $this->recipient,
                'is_confirmation' => $this->isConfirmation,
                'subject' => $this->contactData['subject'] ?? 'N/A',
            ]);

        } catch (\Exception $e) {
            Log::error('Échec d\'envoi d\'email de contact', [
                'recipient' => $this->recipient,
                'is_confirmation' => $this->isConfirmation,
                'error' => $e->getMessage(),
                'attempt' => $this->attempts(),
            ]);

            // Si c'est le dernier essai, on abandonne
            if ($this->attempts() >= $this->tries) {
                Log::error('Abandon définitif de l\'envoi d\'email de contact', [
                    'recipient' => $this->recipient,
                    'contact_data' => $this->contactData,
                ]);
            }

            throw $e; // Relancer l'exception pour déclencher un retry
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(\Throwable $exception): void
    {
        Log::error('Job d\'envoi d\'email de contact échoué définitivement', [
            'recipient' => $this->recipient,
            'is_confirmation' => $this->isConfirmation,
            'contact_data' => $this->contactData,
            'error' => $exception->getMessage(),
        ]);
    }
}
