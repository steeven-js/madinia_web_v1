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
        Schema::create('formations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('formation_category_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('image')->nullable();
            $table->string('pdf_file')->nullable();
            $table->integer('duration')->nullable()->comment('Durée en heures');
            $table->boolean('certification')->default(false);
            $table->enum('level', ['debutant', 'intermediaire', 'avance'])->default('debutant');
            $table->longText('objectives')->nullable();
            $table->longText('prerequisites')->nullable();
            $table->longText('program')->nullable();
            $table->string('target_audience')->nullable();
            $table->string('training_methods')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formations');
    }
};
