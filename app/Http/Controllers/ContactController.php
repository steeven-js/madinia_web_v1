<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactMail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Symfony\Component\Mailer\Exception\TransportException;

class ContactController extends Controller
{
    /**
     * Affiche la page de contact
     */
    public function index()
    {
        return Inertia::render('contact');
    }

    /**
     * Traite l'envoi du formulaire de contact
     */
    public function store(ContactRequest $request)
    {
        try {
            // Données validées du formulaire
            $data = $request->validated();

            // En développement, envoyer vers Mailtrap avec gestion du rate limit
            if (! app()->environment('production')) {
                try {
                    // Envoi vers Mailtrap en mode développement
                    // S'assurer que l'email admin est configuré
                    $adminEmail = config('mail.admin_email', 'contact@madinia.fr');
                    Mail::to($adminEmail)->send(new ContactMail($data));

                    // Délai pour éviter le rate limiting Mailtrap
                    sleep(1);

                    // Email de confirmation (optionnel en dev pour éviter le spam)
                    // Mail::to($data['email'])->send(new ContactMail($data, true));

                    Log::info('Email de contact envoyé vers Mailtrap', [
                        'to_admin' => config('mail.admin_email', 'contact@madinia.fr'),
                        'from_client' => $data['email'],
                        'subject' => $data['subject'],
                    ]);

                    return back()->with('success', 'Votre message a été envoyé avec succès vers Mailtrap !');

                } catch (\Exception $e) {
                    // Si erreur de rate limit, on simule
                    Log::warning('Rate limit Mailtrap - email simulé', [
                        'error' => $e->getMessage(),
                        'data' => $data,
                    ]);

                    return back()->with('success', 'Message traité (simulé à cause du rate limit Mailtrap)');
                }
            }

            // En production, envoi réel des emails
            try {
                // Envoi de l'email à l'administrateur
                Mail::to(config('mail.admin_email', 'contact@madinia.fr'))
                    ->send(new ContactMail($data));

                // Petit délai pour éviter le rate limiting
                sleep(1);

                // Envoi d'un email de confirmation au client
                Mail::to($data['email'])->send(new ContactMail($data, true));

                return back()->with('success', 'Votre message a été envoyé avec succès !');

            } catch (TransportException $e) {
                // Erreur spécifique de transport email (rate limit, SMTP, etc.)
                Log::error('Erreur de transport email', [
                    'error' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'data' => $data,
                ]);

                return back()->withErrors([
                    'contact' => 'Erreur d\'envoi : notre serveur email est temporairement surchargé. Veuillez réessayer dans quelques minutes.',
                ]);

            } catch (\Exception $e) {
                // Autres erreurs email
                Log::error('Erreur d\'envoi email de contact', [
                    'error' => $e->getMessage(),
                    'data' => $data,
                ]);

                return back()->withErrors([
                    'contact' => 'Une erreur technique est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.',
                ]);
            }

        } catch (\Exception $e) {
            // Erreur générale (validation, etc.)
            Log::error('Erreur générale dans le formulaire de contact', [
                'error' => $e->getMessage(),
                'request' => $request->all(),
            ]);

            return back()->withErrors([
                'contact' => 'Une erreur est survenue lors du traitement de votre demande.',
            ]);
        }
    }
}
