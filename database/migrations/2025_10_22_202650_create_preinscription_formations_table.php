<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('preinscription_formations', function (Blueprint $table) {
            $table->id();

            // Informations personnelles
            $table->string('nom', 100);
            $table->string('prenom', 100);
            $table->string('email', 255);
            $table->string('telephone', 20);

            // Formation souhaitée
            $table->foreignId('formation_id')
                ->constrained('formations')
                ->onDelete('cascade');

            // Modalités de financement
            $table->enum('moyen_financement', [
                'cpf',
                'opco',
                'france_travail',
                'autofinancement',
                'autre',
            ]);

            // Format de formation préféré
            $table->enum('format_preference', [
                'presentiel',
                'distanciel',
                'hybride',
            ]);

            // Commentaires (facultatif)
            $table->text('commentaires')->nullable();

            // Statut de la pré-inscription
            $table->enum('statut', [
                'en_attente',
                'groupe_en_constitution',
                'groupe_complet',
                'session_planifiee',
                'inscrit',
                'annule',
            ])->default('en_attente');

            // Date de session planifiée (si applicable)
            $table->date('date_session_planifiee')->nullable();

            // Date de notification envoyée (pour tracking)
            $table->timestamp('notifie_le')->nullable();

            // Gestion des groupes
            $table->string('groupe_reference', 50)->nullable();
            $table->integer('taille_groupe_cible')->default(8);

            $table->timestamps();

            // Index pour optimiser les recherches
            $table->index('statut');
            $table->index('formation_id');
            $table->index(['formation_id', 'statut']);
            $table->index('groupe_reference');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preinscription_formations');
    }
};
