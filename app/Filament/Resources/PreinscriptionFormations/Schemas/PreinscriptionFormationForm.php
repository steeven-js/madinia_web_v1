<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Schemas;

use App\Enums\FormatFormation;
use App\Enums\MoyenFinancement;
use App\Enums\StatutPreinscription;
use App\Models\Formation;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PreinscriptionFormationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Section::make('Informations du candidat')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('prenom')
                                    ->label('Prénom')
                                    ->required()
                                    ->maxLength(100),

                                TextInput::make('nom')
                                    ->label('Nom')
                                    ->required()
                                    ->maxLength(100),

                                TextInput::make('email')
                                    ->label('Adresse e-mail')
                                    ->email()
                                    ->required()
                                    ->maxLength(255),

                                TextInput::make('telephone')
                                    ->label('Téléphone')
                                    ->tel()
                                    ->required()
                                    ->maxLength(20),
                            ]),
                    ])
                    ->collapsible(),

                Section::make('Formation souhaitée')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('formation_id')
                                    ->label('Formation')
                                    ->relationship('formation', 'title')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->getOptionLabelFromRecordUsing(
                                        fn (Formation $record): string => "{$record->title} ({$record->formatted_duration})"
                                    )
                                    ->helperText('Sélectionnez la formation qui intéresse le candidat'),

                                Select::make('moyen_financement')
                                    ->label('Moyen de financement')
                                    ->options(collect(MoyenFinancement::cases())->mapWithKeys(fn ($case) => [
                                        $case->value => $case->label(),
                                    ]))
                                    ->required()
                                    ->native(false),

                                Select::make('format_preference')
                                    ->label('Format préféré')
                                    ->options(collect(FormatFormation::cases())->mapWithKeys(fn ($case) => [
                                        $case->value => $case->label(),
                                    ]))
                                    ->required()
                                    ->native(false),

                                TextInput::make('taille_groupe_cible')
                                    ->label('Taille groupe cible')
                                    ->numeric()
                                    ->default(8)
                                    ->minValue(1)
                                    ->maxValue(30)
                                    ->helperText('Nombre minimum de personnes pour constituer un groupe'),
                            ]),
                    ])
                    ->collapsible(),

                Section::make('Gestion de la pré-inscription')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('statut')
                                    ->label('Statut')
                                    ->options(collect(StatutPreinscription::cases())->mapWithKeys(fn ($case) => [
                                        $case->value => $case->label(),
                                    ]))
                                    ->default('en_attente')
                                    ->required()
                                    ->native(false),

                                DatePicker::make('date_session_planifiee')
                                    ->label('Date de session planifiée')
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->helperText('Date prévue pour le démarrage de la formation'),

                                TextInput::make('groupe_reference')
                                    ->label('Référence du groupe')
                                    ->maxLength(50)
                                    ->helperText('Identifiant pour regrouper les pré-inscriptions'),

                                DatePicker::make('notifie_le')
                                    ->label('Notifié le')
                                    ->native(false)
                                    ->displayFormat('d/m/Y H:i')
                                    ->disabled()
                                    ->dehydrated(false)
                                    ->helperText('Date du dernier envoi de notification'),
                            ]),
                    ])
                    ->collapsible(),

                Section::make('Commentaires')
                    ->schema([
                        Textarea::make('commentaires')
                            ->label('Commentaires ou questions')
                            ->rows(4)
                            ->maxLength(1000)
                            ->columnSpanFull(),
                    ])
                    ->collapsible()
                    ->collapsed(),
            ]);
    }
}
