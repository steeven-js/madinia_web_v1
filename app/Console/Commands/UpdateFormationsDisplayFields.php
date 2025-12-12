<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;

class UpdateFormationsDisplayFields extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'formations:update-display-fields';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Met à jour les champs d\'affichage pour toutes les formations existantes (par défaut: true)';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🔄 Mise à jour des champs d\'affichage pour les formations...');

        $formations = Formation::all();

        if ($formations->isEmpty()) {
            $this->warn('⚠️  Aucune formation trouvée.');

            return Command::SUCCESS;
        }

        $count = 0;

        foreach ($formations as $formation) {
            $formation->update([
                'show_duration' => true,
                'show_objectives' => true,
                'show_prerequisites' => true,
                'show_program' => true,
            ]);
            $count++;
        }

        $this->info("✅ {$count} formation(s) mise(s) à jour avec succès!");

        return Command::SUCCESS;
    }
}
