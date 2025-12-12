<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PreinscriptionFormationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations du candidat')
                    ->schema([
                        TextEntry::make('nom_complet')
                            ->label('Nom complet')
                            ->getStateUsing(fn ($record) => "{$record->prenom} {$record->nom}")
                            ->weight('bold'),

                        TextEntry::make('email')
                            ->label('Email')
                            ->copyable()
                            ->icon('heroicon-m-envelope'),

                        TextEntry::make('telephone')
                            ->label('Téléphone')
                            ->copyable()
                            ->icon('heroicon-m-phone'),
                    ])
                    ->columns(3),

                Section::make('Formation souhaitée')
                    ->schema([
                        TextEntry::make('formation.title')
                            ->label('Formation'),

                        TextEntry::make('moyen_financement')
                            ->label('Moyen de financement')
                            ->badge()
                            ->getStateUsing(fn ($record) => $record->moyen_financement->label())
                            ->color('info'),

                        TextEntry::make('format_preference')
                            ->label('Format préféré')
                            ->badge()
                            ->getStateUsing(fn ($record) => $record->format_preference->label())
                            ->color('gray'),

                        TextEntry::make('statut')
                            ->label('Statut')
                            ->badge()
                            ->getStateUsing(fn ($record) => $record->statut->label())
                            ->colors([
                                'secondary' => fn ($state, $record) => $record->statut->value === 'en_attente',
                                'info' => fn ($state, $record) => $record->statut->value === 'groupe_en_constitution',
                                'warning' => fn ($state, $record) => $record->statut->value === 'groupe_complet',
                                'success' => fn ($state, $record) => in_array($record->statut->value, [
                                    'session_planifiee',
                                    'inscrit',
                                ]),
                                'danger' => fn ($state, $record) => $record->statut->value === 'annule',
                            ]),
                    ])
                    ->columns(2),

                Section::make('Sessions attribuées')
                    ->schema([
                        TextEntry::make('sessions_count')
                            ->label('Nombre de sessions')
                            ->getStateUsing(fn ($record) => $record->sessions()->count())
                            ->suffix(' session(s)'),

                        TextEntry::make('sessions_list')
                            ->label('Liste des sessions')
                            ->getStateUsing(function ($record) {
                                $sessions = $record->sessions;
                                if ($sessions->isEmpty()) {
                                    return 'Aucune session attribuée';
                                }

                                return $sessions->map(function ($session) {
                                    $dateDebut = $session->date_debut->format('d/m/Y');
                                    $dateFin = $session->date_fin ? ' - '.$session->date_fin->format('d/m/Y') : '';
                                    $statut = $session->statut->label();
                                    $formation = $session->formation->title;

                                    $pivotStatut = $session->pivot->statut_attribution ?? 'attribue';
                                    $statutAttribution = match ($pivotStatut) {
                                        'attribue' => 'Attribué',
                                        'confirme' => 'Confirmé',
                                        'annule' => 'Annulé',
                                        default => $pivotStatut
                                    };

                                    return "• {$formation} - {$dateDebut}{$dateFin} ({$statut}) - {$statutAttribution}";
                                })->join("\n");
                            })
                            ->columnSpanFull()
                            ->placeholder('Aucune session attribuée')
                            ->helperText('Sessions de formation auxquelles ce candidat a été attribué'),
                    ])
                    ->collapsible()
                    ->visible(fn ($record) => $record->sessions()->count() > 0),

                Section::make('Informations complémentaires')
                    ->schema([
                        TextEntry::make('commentaires')
                            ->label('Commentaires')
                            ->placeholder('Aucun commentaire')
                            ->columnSpanFull(),

                        TextEntry::make('groupe_reference')
                            ->label('Référence du groupe')
                            ->placeholder('Non renseigné'),

                        TextEntry::make('date_session_planifiee')
                            ->label('Date de session planifiée (ancienne)')
                            ->date('d/m/Y')
                            ->placeholder('Non définie')
                            ->helperText('Ce champ est conservé pour compatibilité. Utilisez les sessions attribuées ci-dessus.'),

                        TextEntry::make('notifie_le')
                            ->label('Notifié le')
                            ->dateTime('d/m/Y à H:i')
                            ->placeholder('Non notifié'),

                        TextEntry::make('created_at')
                            ->label('Pré-inscrit le')
                            ->dateTime('d/m/Y à H:i'),
                    ])
                    ->collapsible()
                    ->collapsed(),
            ]);
    }
}
