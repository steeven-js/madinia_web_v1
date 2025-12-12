<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Enums\StatutPreinscription;
use App\Enums\StatutSession;
use App\Models\PreinscriptionFormation;
use App\Models\Session;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SessionsStatsWidget extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        // Nombre de sessions programmées (planifiées ou en cours)
        $sessionsProgrammees = Session::whereIn('statut', [
            StatutSession::PLANIFIEE,
            StatutSession::EN_COURS,
        ])->count();

        // Nombre de demandes en liste d'attente
        $demandesAttente = PreinscriptionFormation::where('statut', StatutPreinscription::EN_ATTENTE)
            ->count();

        return [
            Stat::make('Sessions programmées', $sessionsProgrammees)
                ->description('Planifiées et en cours')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary')
                ->url(\App\Filament\Resources\Sessions\SessionResource::getUrl('index')),

            Stat::make('Demandes en attente', $demandesAttente)
                ->description('En liste d\'attente')
                ->descriptionIcon('heroicon-m-clock')
                ->color('warning')
                ->url(\App\Filament\Resources\PreinscriptionFormations\PreinscriptionFormationResource::getUrl('index')),
        ];
    }
}
