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
        Schema::create('formation_sessions', function (Blueprint $table) {
            $table->id();

            // Formation associée
            $table->foreignId('formation_id')
                ->constrained('formations')
                ->onDelete('cascade');

            // Dates de la session
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->time('heure_debut')->nullable();
            $table->time('heure_fin')->nullable();

            // Lieu et format
            $table->string('lieu', 255)->nullable();
            $table->enum('format', [
                'presentiel',
                'distanciel',
                'hybride',
            ])->default('presentiel');

            // Capacité et statut
            $table->integer('capacite_max')->default(20);
            $table->enum('statut', [
                'planifiee',
                'en_cours',
                'terminee',
                'annulee',
            ])->default('planifiee');

            // Notes et informations complémentaires
            $table->text('notes')->nullable();

            // Utilisateur qui a créé la session
            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->onDelete('set null');

            $table->timestamps();

            // Index pour optimiser les recherches
            $table->index('formation_id');
            $table->index('statut');
            $table->index('date_debut');
            $table->index(['formation_id', 'statut']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formation_sessions');
    }
};
