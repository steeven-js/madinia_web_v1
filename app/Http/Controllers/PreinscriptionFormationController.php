<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\FormatFormation;
use App\Enums\MoyenFinancement;
use App\Mail\PreinscriptionMail;
use App\Mail\PreinscriptionNotificationMail;
use App\Models\Formation;
use App\Models\PreinscriptionFormation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PreinscriptionFormationController extends Controller
{
    /**
     * Affiche la page de pré-inscription
     */
    public function index()
    {
        // Récupérer toutes les formations publiées
        $formations = Formation::published()
            ->with('category')
            ->orderBy('order', 'asc')
            ->get()
            ->map(function ($formation) {
                return [
                    'id' => $formation->id,
                    'title' => $formation->title,
                    'duration' => $formation->formatted_duration,
                    'category' => $formation->category?->name,
                    'level' => $formation->level_label,
                ];
            });

        return Inertia::render('preinscription/index', [
            'formations' => $formations,
            'moyensFinancement' => MoyenFinancement::options(),
            'formatsFormation' => FormatFormation::options(),
        ]);
    }

    /**
     * Enregistre une nouvelle pré-inscription
     */
    public function store(Request $request)
    {
        try {
            // Validation des données
            $validated = $request->validate([
                'nom' => ['required', 'string', 'max:100'],
                'prenom' => ['required', 'string', 'max:100'],
                'email' => ['required', 'email', 'max:255'],
                'telephone' => ['required', 'string', 'max:20'],
                'formation_id' => ['required', 'exists:formations,id'],
                'moyen_financement' => ['required', Rule::enum(MoyenFinancement::class)],
                'format_preference' => ['required', Rule::enum(FormatFormation::class)],
                'commentaires' => ['nullable', 'string', 'max:1000'],
            ]);

            // Créer la pré-inscription
            $preinscription = PreinscriptionFormation::create($validated);

            // Charger la relation formation
            $preinscription->load('formation');

            // Envoyer l'email de confirmation au candidat
            try {
                Mail::to($preinscription->email)->send(new PreinscriptionMail($preinscription));

                Log::info('Email de confirmation de pré-inscription envoyé', [
                    'preinscription_id' => $preinscription->id,
                    'email' => $preinscription->email,
                    'formation' => $preinscription->formation->title,
                ]);
            } catch (\Exception $e) {
                Log::error('Erreur lors de l\'envoi de l\'email de confirmation', [
                    'preinscription_id' => $preinscription->id,
                    'error' => $e->getMessage(),
                ]);
            }

            // Envoyer une notification aux administrateurs
            try {
                $adminEmails = [
                    's.jacques@madinia.fr',
                    'd.brault@madinia.fr',
                    'jh.joseph@madinia.fr',
                ];

                Mail::to($adminEmails)->send(new PreinscriptionNotificationMail($preinscription));

                Log::info('Email de notification de pré-inscription envoyé aux administrateurs', [
                    'preinscription_id' => $preinscription->id,
                    'admin_emails' => $adminEmails,
                    'formation' => $preinscription->formation->title,
                ]);
            } catch (\Exception $e) {
                Log::error('Erreur lors de l\'envoi de l\'email de notification aux administrateurs', [
                    'preinscription_id' => $preinscription->id,
                    'error' => $e->getMessage(),
                ]);
            }

            return back()->with(
                'success',
                'Merci pour votre inscription ! Nous vous contacterons dès que la prochaine session sera ouverte. ' .
                'Vous recevrez également une confirmation par e-mail.'
            );

        } catch (\Illuminate\Validation\ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();

        } catch (\Exception $e) {
            Log::error('Erreur lors de la création de la pré-inscription', [
                'error' => $e->getMessage(),
                'request' => $request->all(),
            ]);

            return back()->withErrors([
                'preinscription' => 'Une erreur est survenue lors de l\'enregistrement de votre pré-inscription. Veuillez réessayer.',
            ])->withInput();
        }
    }
}
