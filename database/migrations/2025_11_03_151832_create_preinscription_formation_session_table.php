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
        Schema::create('preinscription_formation_session', function (Blueprint $table) {
            $table->id();

            // Relations
            $table->foreignId('session_id')
                ->constrained('formation_sessions')
                ->onDelete('cascade');

            $table->foreignId('preinscription_formation_id')
                ->constrained('preinscription_formations')
                ->onDelete('cascade');

            // Statut de l'attribution
            $table->enum('statut_attribution', [
                'attribue',
                'confirme',
                'annule',
            ])->default('attribue');

            // Date d'attribution
            $table->timestamp('date_attribution')->useCurrent();

            // Notes spécifiques à cette attribution
            $table->text('notes')->nullable();

            $table->timestamps();

            // Index et contraintes uniques
            $table->unique(['session_id', 'preinscription_formation_id']);
            $table->index('session_id');
            $table->index('preinscription_formation_id');
            $table->index('statut_attribution');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preinscription_formation_session');
    }
};
