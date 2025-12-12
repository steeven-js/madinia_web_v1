<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;

class UpdateFormationsCertification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'formations:update-certification';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Met à jour toutes les formations pour indiquer qu\'elles ne sont pas certifiantes';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Mise à jour du statut de certification des formations...');

        // Compter les formations certifiantes avant la mise à jour
        $countBefore = Formation::where('certification', true)->count();
        $this->info("Formations actuellement certifiantes : {$countBefore}");

        // Mettre à jour toutes les formations
        $updated = Formation::query()->update(['certification' => false]);

        $this->info("✅ {$updated} formation(s) mise(s) à jour");
        $this->info('Toutes les formations sont maintenant marquées comme non-certifiantes.');

        return Command::SUCCESS;
    }
}
