<?php

declare(strict_types=1);

namespace App\Filament\Resources\Sessions\Tables;

use App\Enums\StatutSession;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SessionsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('formation.title')
                    ->label('Formation')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(40)
                    ->tooltip(fn ($record) => $record->formation->title),

                TextColumn::make('date_debut')
                    ->label('Date de début')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('date_fin')
                    ->label('Date de fin')
                    ->date('d/m/Y')
                    ->sortable()
                    ->placeholder('-')
                    ->toggleable(),

                TextColumn::make('heure_debut')
                    ->label('Heure début')
                    ->time('H:i')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('lieu')
                    ->label('Lieu')
                    ->searchable()
                    ->limit(30)
                    ->toggleable(),

                TextColumn::make('format')
                    ->label('Format')
                    ->badge()
                    ->getStateUsing(fn ($record) => $record->format->label())
                    ->color('info'),

                TextColumn::make('nombre_participants')
                    ->label('Participants')
                    ->getStateUsing(fn ($record) => "{$record->nombre_participants} / {$record->capacite_max}")
                    ->badge()
                    ->color(
                        fn ($record) => $record->estComplete() ? 'success' :
                        ($record->aDeLaPlace() ? 'info' : 'warning')
                    ),

                BadgeColumn::make('statut')
                    ->label('Statut')
                    ->getStateUsing(fn ($record) => $record->statut->label())
                    ->colors([
                        'primary' => fn ($state, $record) => $record->statut === StatutSession::PLANIFIEE,
                        'success' => fn ($state, $record) => $record->statut === StatutSession::EN_COURS,
                        'gray' => fn ($state, $record) => $record->statut === StatutSession::TERMINEE,
                        'danger' => fn ($state, $record) => $record->statut === StatutSession::ANNULEE,
                    ]),

                TextColumn::make('created_at')
                    ->label('Créée le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('creator.name')
                    ->label('Créée par')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('statut')
                    ->label('Statut')
                    ->options(collect(StatutSession::cases())->mapWithKeys(fn ($case) => [
                        $case->value => $case->label(),
                    ])),

                SelectFilter::make('formation_id')
                    ->label('Formation')
                    ->relationship('formation', 'title')
                    ->searchable()
                    ->preload(),

                SelectFilter::make('format')
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
            ->defaultSort('date_debut', 'desc')
            ->emptyStateHeading('Aucune session')
            ->emptyStateDescription('Les sessions planifiées apparaîtront ici.')
            ->emptyStateIcon('heroicon-o-calendar');
    }
}
