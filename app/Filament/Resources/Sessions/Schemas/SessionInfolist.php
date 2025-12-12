<?php

declare(strict_types=1);

namespace App\Filament\Resources\Sessions\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SessionInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations de la session')
                    ->schema([
                        TextEntry::make('formation.title')
                            ->label('Formation')
                            ->weight('bold'),

                        TextEntry::make('date_debut')
                            ->label('Date de début')
                            ->date('d/m/Y'),

                        TextEntry::make('date_fin')
                            ->label('Date de fin')
                            ->date('d/m/Y')
                            ->placeholder('Non définie'),

                        TextEntry::make('heure_debut')
                            ->label('Heure de début')
                            ->time('H:i')
                            ->placeholder('Non définie'),

                        TextEntry::make('heure_fin')
                            ->label('Heure de fin')
                            ->time('H:i')
                            ->placeholder('Non définie'),

                        TextEntry::make('lieu')
                            ->label('Lieu')
                            ->placeholder('Non défini'),

                        TextEntry::make('format')
                            ->label('Format')
                            ->badge()
                            ->getStateUsing(fn ($record) => $record->format->label())
                            ->color('info'),

                        TextEntry::make('statut')
                            ->label('Statut')
                            ->badge()
                            ->getStateUsing(fn ($record) => $record->statut->label())
                            ->colors([
                                'primary' => fn ($state, $record) => $record->statut->value === 'planifiee',
                                'success' => fn ($state, $record) => $record->statut->value === 'en_cours',
                                'gray' => fn ($state, $record) => $record->statut->value === 'terminee',
                                'danger' => fn ($state, $record) => $record->statut->value === 'annulee',
                            ]),

                        TextEntry::make('capacite_max')
                            ->label('Capacité maximale')
                            ->suffix(' participants'),

                        TextEntry::make('nombre_participants')
                            ->label('Participants attribués')
                            ->getStateUsing(fn ($record) => "{$record->nombre_participants} / {$record->capacite_max}")
                            ->badge()
                            ->color(
                                fn ($record) => $record->estComplete() ? 'success' :
                                ($record->aDeLaPlace() ? 'info' : 'warning')
                            ),

                        TextEntry::make('places_restantes')
                            ->label('Places restantes')
                            ->getStateUsing(fn ($record) => $record->places_restantes)
                            ->suffix(' place(s)'),

                        TextEntry::make('notes')
                            ->label('Notes')
                            ->placeholder('Aucune note')
                            ->columnSpanFull(),

                        TextEntry::make('creator.name')
                            ->label('Créée par')
                            ->placeholder('Non renseigné'),

                        TextEntry::make('created_at')
                            ->label('Créée le')
                            ->dateTime('d/m/Y à H:i'),
                    ])
                    ->columns(2),

                Section::make('Candidats attribués')
                    ->schema([
                        TextEntry::make('preinscriptions_count')
                            ->label('Nombre de candidats')
                            ->getStateUsing(fn ($record) => $record->preinscriptions()->count())
                            ->suffix(' candidat(s)'),

                        TextEntry::make('preinscriptions_list')
                            ->label('Liste des candidats')
                            ->getStateUsing(function ($record) {
                                $preinscriptions = $record->preinscriptions;
                                if ($preinscriptions->isEmpty()) {
                                    return 'Aucun candidat attribué';
                                }

                                return $preinscriptions->map(function ($preinscription) {
                                    $statut = $preinscription->statut->label();
                                    $pivotStatut = $preinscription->pivot->statut_attribution ?? 'attribue';
                                    $statutAttribution = match ($pivotStatut) {
                                        'attribue' => 'Attribué',
                                        'confirme' => 'Confirmé',
                                        'annule' => 'Annulé',
                                        default => $pivotStatut
                                    };
                                    $dateAttribution = $preinscription->pivot->date_attribution
                                        ? $preinscription->pivot->date_attribution->format('d/m/Y')
                                        : '';

                                    return "• {$preinscription->prenom} {$preinscription->nom} ({$preinscription->email}) - Statut: {$statut} - Attribution: {$statutAttribution}".($dateAttribution ? " le {$dateAttribution}" : '');
                                })->join("\n");
                            })
                            ->columnSpanFull()
                            ->placeholder('Aucun candidat attribué')
                            ->helperText('Liste des candidats attribués à cette session avec leur statut d\'attribution'),
                    ])
                    ->collapsible(),
            ]);
    }
}
