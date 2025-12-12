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
        Schema::create('cvs', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email');
            $table->string('telephone')->nullable();
            $table->string('github')->nullable();
            $table->text('bio')->nullable();
            $table->string('titre_professionnel');
            $table->text('formations')->nullable();
            $table->text('langues')->nullable();
            $table->text('competences_techniques')->nullable();
            $table->text('savoir_etre')->nullable();
            $table->text('contexte_travail')->nullable();
            $table->text('experiences')->nullable();
            $table->string('fichier_pdf')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cvs');
    }
};
