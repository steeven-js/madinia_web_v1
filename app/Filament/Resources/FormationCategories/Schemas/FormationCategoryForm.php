<?php

declare(strict_types=1);

namespace App\Filament\Resources\FormationCategories\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class FormationCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informations générales')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('name')
                                    ->label('Nom de la catégorie')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                                TextInput::make('slug')
                                    ->label('Slug (URL)')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->helperText('Généré automatiquement à partir du nom'),
                            ]),

                        RichEditor::make('description')
                            ->label('Description')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                            ]),
                    ]),

                Section::make('Apparence')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                TextInput::make('icon')
                                    ->label('Icône (classe CSS ou nom)')
                                    ->helperText('Ex: heroicon-o-academic-cap'),

                                ColorPicker::make('color')
                                    ->label('Couleur')
                                    ->default('#3B82F6'),

                                TextInput::make('order')
                                    ->label('Ordre d\'affichage')
                                    ->numeric()
                                    ->default(0)
                                    ->helperText('Plus petit = affiché en premier'),
                            ]),
                    ]),

                Section::make('Statut')
                    ->schema([
                        Toggle::make('is_active')
                            ->label('Actif')
                            ->default(true)
                            ->helperText('Seules les catégories actives sont visibles sur le site'),
                    ]),
            ]);
    }
}
