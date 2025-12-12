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
        Schema::table('formations', function (Blueprint $table) {
            $table->boolean('show_duration')->default(true)->after('duration');
            $table->boolean('show_objectives')->default(true)->after('objectives');
            $table->boolean('show_prerequisites')->default(true)->after('prerequisites');
            $table->boolean('show_program')->default(true)->after('program');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('formations', function (Blueprint $table) {
            $table->dropColumn(['show_duration', 'show_objectives', 'show_prerequisites', 'show_program']);
        });
    }
};
