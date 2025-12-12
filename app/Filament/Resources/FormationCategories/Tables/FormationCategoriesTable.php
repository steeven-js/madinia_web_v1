<?php

declare(strict_types=1);

namespace App\Filament\Resources\FormationCategories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class FormationCategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order')
                    ->label('Ordre')
                    ->sortable()
                    ->width(80),

                ColorColumn::make('color')
                    ->label('Couleur')
                    ->width(80),

                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record) => $record->slug),

                TextColumn::make('formations_count')
                    ->label('Formations')
                    ->counts('formations')
                    ->badge()
                    ->width(100),

                IconColumn::make('is_active')
                    ->label('Actif')
                    ->boolean()
                    ->width(80),

                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('is_active')
                    ->label('Statut')
                    ->placeholder('Tous')
                    ->trueLabel('Actifs seulement')
                    ->falseLabel('Inactifs seulement'),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('order', 'asc');
    }
}
