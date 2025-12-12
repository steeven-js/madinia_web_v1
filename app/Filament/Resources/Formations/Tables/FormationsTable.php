<?php

declare(strict_types=1);

namespace App\Filament\Resources\Formations\Tables;

use App\Helpers\SupabaseHelper;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class FormationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order')
                    ->label('Ordre')
                    ->sortable()
                    ->width(70),

                ImageColumn::make('image')
                    ->label('Image')
                    ->getStateUsing(fn ($record) => $record->image ? SupabaseHelper::getPublicUrl($record->image) : null)
                    ->defaultImageUrl(asset('assets/images/course/course-1.webp'))
                    ->square()
                    ->width(80)
                    ->height(80)
                    ->toggleable(),

                TextColumn::make('title')
                    ->label('Titre')
                    ->searchable()
                    ->sortable()
                    ->description(fn ($record) => $record->short_description ? \Str::limit($record->short_description, 80) : null)
                    ->wrap()
                    ->limit(30),

                TextColumn::make('category.name')
                    ->label('Catégorie')
                    ->badge()
                    ->color(fn ($record) => $record->category?->color ? \Filament\Support\Colors\Color::hex($record->category->color) : 'gray')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('level')
                    ->label('Niveau')
                    ->badge()
                    ->formatStateUsing(fn ($state) => match ($state) {
                        'debutant' => 'Débutant',
                        'intermediaire' => 'Intermédiaire',
                        'avance' => 'Avancé',
                        default => $state,
                    })
                    ->color(fn ($state) => match ($state) {
                        'debutant' => 'success',
                        'intermediaire' => 'warning',
                        'avance' => 'danger',
                        default => 'gray',
                    })
                    ->toggleable(),

                TextColumn::make('duration')
                    ->label('Durée')
                    ->suffix(' h')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('pdf_file')
                    ->label('PDF')
                    ->url(fn ($record) => SupabaseHelper::getPublicUrl($record->pdf_file))
                    ->openUrlInNewTab()
                    ->icon('heroicon-o-document-arrow-down')
                    ->color('primary')
                    ->formatStateUsing(fn ($state) => $state ? 'Télécharger' : '-')
                    ->toggleable(),

                TextColumn::make('certification')
                    ->label('Certification')
                    ->badge()
                    ->formatStateUsing(fn ($state) => $state ? 'Certifiante' : 'Non certifiante')
                    ->color(fn ($state) => $state ? 'success' : 'gray')
                    ->icon(fn ($state) => $state ? 'heroicon-o-check-badge' : 'heroicon-o-x-circle')
                    ->sortable()
                    ->toggleable(),

                IconColumn::make('is_published')
                    ->label('Publié')
                    ->boolean()
                    ->width(70)
                    ->sortable(),

                TextColumn::make('published_at')
                    ->label('Date de publication')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('formation_category_id')
                    ->label('Catégorie')
                    ->relationship('category', 'name')
                    ->searchable()
                    ->preload(),

                SelectFilter::make('level')
                    ->label('Niveau')
                    ->options([
                        'debutant' => 'Débutant',
                        'intermediaire' => 'Intermédiaire',
                        'avance' => 'Avancé',
                    ]),

                TernaryFilter::make('is_published')
                    ->label('Statut de publication')
                    ->placeholder('Tous')
                    ->trueLabel('Publiés seulement')
                    ->falseLabel('Brouillons seulement'),

                TernaryFilter::make('certification')
                    ->label('Certification')
                    ->placeholder('Tous')
                    ->trueLabel('Certifiantes seulement')
                    ->falseLabel('Non certifiantes seulement'),
            ])
            ->recordActions([
                ViewAction::make()
                    ->label('Voir'),
                EditAction::make()
                    ->label('Modifier'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('order', 'asc');
    }
}
