<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Formation;
use Illuminate\Console\Command;

class UpdateFormationsCertificationCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'formations:update-certification 
                            {--dry-run : Afficher les changements sans les appliquer}
                            {--certifiante : Marquer comme certifiante au lieu de non certifiante}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Met à jour le statut de certification de toutes les formations';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $dryRun = $this->option('dry-run');
        $certifiante = $this->option('certifiante');
        $certificationValue = $certifiante ? true : false;
        $certificationLabel = $certifiante ? 'certifiante' : 'non certifiante';

        $this->info('🔍 Recherche des formations...');

        // Récupérer toutes les formations
        $formations = Formation::all();

        if ($formations->isEmpty()) {
            $this->warn('⚠️  Aucune formation trouvée dans la base de données.');

            return self::SUCCESS;
        }

        $this->info("✅ {$formations->count()} formation(s) trouvée(s)");
        $this->newLine();

        if ($dryRun) {
            $this->warn('⚠️  MODE DRY-RUN : Aucune modification ne sera effectuée');
            $this->newLine();
        }

        // Filtrer les formations qui ne sont pas déjà au bon statut
        $formationsToUpdate = $formations->filter(function ($formation) use ($certificationValue) {
            return $formation->certification !== $certificationValue;
        });

        if ($formationsToUpdate->isEmpty()) {
            $this->info("✅ Toutes les formations sont déjà marquées comme {$certificationLabel}");

            return self::SUCCESS;
        }

        $this->info("📝 {$formationsToUpdate->count()} formation(s) seront mises à jour vers '{$certificationLabel}' :");
        $this->newLine();

        // Afficher le tableau des formations à mettre à jour
        $headers = ['ID', 'Titre', 'Certification actuelle', 'Nouvelle valeur'];
        $rows = $formationsToUpdate->map(function ($formation) use ($certificationLabel) {
            return [
                $formation->id,
                substr($formation->title, 0, 50).(strlen($formation->title) > 50 ? '...' : ''),
                $formation->certification ? 'Certifiante' : 'Non certifiante',
                ucfirst($certificationLabel),
            ];
        })->toArray();

        $this->table($headers, $rows);

        if (! $dryRun) {
            if (! $this->confirm('Voulez-vous continuer et mettre à jour ces formations ?', true)) {
                $this->info('❌ Opération annulée par l\'utilisateur');

                return self::FAILURE;
            }

            $this->info('⚙️  Mise à jour en cours...');

            $progressBar = $this->output->createProgressBar($formationsToUpdate->count());
            $progressBar->start();

            $updated = 0;
            foreach ($formationsToUpdate as $formation) {
                try {
                    $formation->certification = $certificationValue;
                    $formation->save();
                    $updated++;
                } catch (\Exception $e) {
                    $this->error("❌ Erreur lors de la mise à jour de la formation {$formation->id}: {$e->getMessage()}");
                }
                $progressBar->advance();
            }

            $progressBar->finish();
            $this->newLine(2);

            $this->info("✅ {$updated} formation(s) mise(s) à jour avec succès !");

            // Statistiques finales
            $this->newLine();
            $this->info('📊 Statistiques finales :');
            $totalCertifiantes = Formation::where('certification', true)->count();
            $totalNonCertifiantes = Formation::where('certification', false)->count();

            $this->line("   • Formations certifiantes : {$totalCertifiantes}");
            $this->line("   • Formations non certifiantes : {$totalNonCertifiantes}");
            $this->line('   • Total : '.($totalCertifiantes + $totalNonCertifiantes));
        } else {
            $this->newLine();
            $this->info('💡 Exécutez la commande sans --dry-run pour appliquer les modifications');
        }

        return self::SUCCESS;
    }
}
