<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;

class VerifyFormationsCertification extends Command
{
    protected $signature = 'formations:verify-certification';

    protected $description = 'Vérifie le statut de certification des formations';

    public function handle(): int
    {
        $total = Formation::count();
        $certifiantes = Formation::where('certification', true)->count();
        $nonCertifiantes = Formation::where('certification', false)->count();

        $this->info('📊 Statistiques des formations');
        $this->line('────────────────────────────────');
        $this->info("Total formations : {$total}");
        $this->info("Certifiantes : {$certifiantes}");
        $this->info("Non-certifiantes : {$nonCertifiantes}");

        if ($certifiantes === 0) {
            $this->line('────────────────────────────────');
            $this->info('✅ Toutes les formations sont bien marquées comme non-certifiantes !');
        }

        return Command::SUCCESS;
    }
}
