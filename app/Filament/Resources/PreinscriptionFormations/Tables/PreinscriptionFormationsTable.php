<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Tables;

use App\Enums\StatutPreinscription;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class PreinscriptionFormationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nom_complet')
                    ->label('Nom complet')
                    ->searchable(['nom', 'prenom'])
                    ->sortable()
                    ->weight('bold')
                    ->getStateUsing(fn ($record) => "{$record->prenom} {$record->nom}"),

                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable()
                    ->icon('heroicon-m-envelope')
                    ->copyable(),

                TextColumn::make('telephone')
                    ->label('Téléphone')
                    ->searchable()
                    ->sortable()
                    ->icon('heroicon-m-phone')
                    ->copyable(),

                TextColumn::make('formation.title')
                    ->label('Formation')
                    ->searchable()
                    ->sortable()
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->formation->title),

                TextColumn::make('moyen_financement')
                    ->label('Financement')
                    ->badge()
                    ->getStateUsing(fn ($record) => $record->moyen_financement->label())
                    ->color('info'),

                TextColumn::make('format_preference')
                    ->label('Format')
                    ->badge()
                    ->getStateUsing(fn ($record) => $record->format_preference->label())
                    ->color('gray'),

                BadgeColumn::make('statut')
                    ->label('Statut')
                    ->getStateUsing(fn ($record) => $record->statut->label())
                    ->colors([
                        'secondary' => fn ($state, $record) => $record->statut === StatutPreinscription::EN_ATTENTE,
                        'info' => fn ($state, $record) => $record->statut === StatutPreinscription::GROUPE_EN_CONSTITUTION,
                        'warning' => fn ($state, $record) => $record->statut === StatutPreinscription::GROUPE_COMPLET,
                        'success' => fn ($state, $record) => in_array($record->statut, [
                            StatutPreinscription::SESSION_PLANIFIEE,
                            StatutPreinscription::INSCRIT,
                        ]),
                        'danger' => fn ($state, $record) => $record->statut === StatutPreinscription::ANNULE,
                    ]),

                TextColumn::make('sessions_count')
                    ->label('Sessions')
                    ->counts('sessions')
                    ->badge()
                    ->color('info')
                    ->getStateUsing(fn ($record) => $record->sessions()->count())
                    ->formatStateUsing(fn ($state) => $state > 0 ? "{$state} session(s)" : 'Aucune')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('date_session')
                    ->label('Date de session')
                    ->getStateUsing(function ($record) {
                        $session = $record->sessions()->orderBy('date_debut')->first();

                        return $session ? $session->date_debut->format('d/m/Y') : null;
                    })
                    ->date('d/m/Y')
                    ->sortable()
                    ->placeholder('-')
                    ->tooltip(function ($record) {
                        $session = $record->sessions()->orderBy('date_debut')->first();
                        if ($session) {
                            $formation = $session->formation->title;
                            $dateFin = $session->date_fin ? ' - '.$session->date_fin->format('d/m/Y') : '';

                            return "{$formation}: {$session->date_debut->format('d/m/Y')}{$dateFin}";
                        }

                        return null;
                    }),

                TextColumn::make('created_at')
                    ->label('Inscrit le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('notifie_le')
                    ->label('Notifié le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->placeholder('-')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('statut')
                    ->label('Statut')
                    ->options(collect(StatutPreinscription::cases())->mapWithKeys(fn ($case) => [
                        $case->value => $case->label(),
                    ])),

                SelectFilter::make('formation_id')
                    ->label('Formation')
                    ->relationship('formation', 'title')
                    ->searchable()
                    ->preload(),

                SelectFilter::make('moyen_financement')
                    ->label('Financement')
                    ->options([
                        'cpf' => 'CPF',
                        'opco' => 'OPCO',
                        'france_travail' => 'France Travail',
                        'autofinancement' => 'Autofinancement',
                        'autre' => 'Autre',
                    ]),

                SelectFilter::make('format_preference')
                    ->label('Format')
                    ->options([
                        'presentiel' => 'Présentiel',
                        'distanciel' => 'Distanciel',
                        'hybride' => 'Hybride',
                    ]),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->emptyStateHeading('Aucune pré-inscription')
            ->emptyStateDescription('Les pré-inscriptions aux formations apparaîtront ici.')
            ->emptyStateIcon('heroicon-o-user-plus');
    }
}
