<?php

declare(strict_types=1);

namespace App\Filament\Resources\Sessions\Schemas;

use App\Enums\FormatFormation;
use App\Enums\StatutSession;
use App\Models\Formation;
use App\Models\PreinscriptionFormation;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TimePicker;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SessionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Section::make('Informations de la session')
                    ->columnSpan(1)
                    ->schema([
                        Select::make('formation_id')
                            ->label('Formation')
                            ->relationship('formation', 'title')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->reactive()
                            ->afterStateUpdated(fn (callable $set) => $set('preinscription_ids', []))
                            ->getOptionLabelFromRecordUsing(
                                fn (Formation $record): string => "{$record->title} ({$record->formatted_duration})"
                            )
                            ->helperText('Sélectionnez la formation pour cette session'),

                        Grid::make(2)
                            ->schema([
                                DatePicker::make('date_debut')
                                    ->label('Date de début')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->rules(['date'])
                                    ->helperText('Date de début de la session'),

                                DatePicker::make('date_fin')
                                    ->label('Date de fin')
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->minDate(fn (callable $get) => $get('date_debut'))
                                    ->helperText('Date de fin (optionnel)'),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TimePicker::make('heure_debut')
                                    ->label('Heure de début')
                                    ->native(false)
                                    ->displayFormat('H:i')
                                    ->seconds(false)
                                    ->helperText('Heure de début (optionnel)'),

                                TimePicker::make('heure_fin')
                                    ->label('Heure de fin')
                                    ->native(false)
                                    ->displayFormat('H:i')
                                    ->seconds(false)
                                    ->helperText('Heure de fin (optionnel)'),
                            ]),

                        Grid::make(2)
                            ->schema([
                                Select::make('format')
                                    ->label('Format')
                                    ->options(collect(FormatFormation::cases())->mapWithKeys(fn ($case) => [
                                        $case->value => $case->label(),
                                    ]))
                                    ->default(FormatFormation::PRESENTIEL->value)
                                    ->required()
                                    ->native(false)
                                    ->reactive(),

                                TextInput::make('capacite_max')
                                    ->label('Capacité maximale')
                                    ->numeric()
                                    ->default(20)
                                    ->required()
                                    ->minValue(1)
                                    ->maxValue(100)
                                    ->helperText('Nombre maximum de participants'),
                            ]),

                        TextInput::make('lieu')
                            ->label('Lieu')
                            ->maxLength(255)
                            ->placeholder('Adresse ou lieu de la session')
                            ->visible(fn (callable $get) => in_array($get('format'), ['presentiel', 'hybride']))
                            ->helperText('Indiquez le lieu si la session est en présentiel'),

                        Select::make('statut')
                            ->label('Statut')
                            ->options(collect(StatutSession::cases())->mapWithKeys(fn ($case) => [
                                $case->value => $case->label(),
                            ]))
                            ->default(StatutSession::PLANIFIEE->value)
                            ->required()
                            ->native(false),

                        Textarea::make('notes')
                            ->label('Notes')
                            ->rows(3)
                            ->maxLength(1000)
                            ->columnSpanFull()
                            ->helperText('Notes et informations complémentaires sur la session'),
                    ]),

                Section::make('Attribution des candidats')
                    ->columnSpan(1)
                    ->schema([
                        Select::make('preinscription_ids')
                            ->label('Candidats à attribuer')
                            ->multiple()
                            ->searchable()
                            ->options(function (callable $get) {
                                $formationId = $get('formation_id');
                                if (! $formationId) {
                                    return [];
                                }

                                return PreinscriptionFormation::query()
                                    ->where('formation_id', $formationId)
                                    ->whereIn('statut', ['en_attente', 'groupe_en_constitution', 'groupe_complet'])
                                    ->get()
                                    ->mapWithKeys(function (PreinscriptionFormation $record) {
                                        return [$record->id => "{$record->prenom} {$record->nom} ({$record->email}) - {$record->statut->label()}"];
                                    });
                            })
                            ->getSearchResultsUsing(function (string $search, callable $get) {
                                $formationId = $get('formation_id');
                                if (! $formationId) {
                                    return [];
                                }

                                return PreinscriptionFormation::query()
                                    ->where('formation_id', $formationId)
                                    ->whereIn('statut', ['en_attente', 'groupe_en_constitution', 'groupe_complet'])
                                    ->where(function ($query) use ($search) {
                                        $query->where('nom', 'like', "%{$search}%")
                                            ->orWhere('prenom', 'like', "%{$search}%")
                                            ->orWhere('email', 'like', "%{$search}%");
                                    })
                                    ->limit(50)
                                    ->get()
                                    ->mapWithKeys(function (PreinscriptionFormation $record) {
                                        return [$record->id => "{$record->prenom} {$record->nom} ({$record->email}) - {$record->statut->label()}"];
                                    });
                            })
                            ->getOptionLabelUsing(function ($value) {
                                $record = PreinscriptionFormation::find($value);
                                if (! $record) {
                                    return (string) $value;
                                }

                                return "{$record->prenom} {$record->nom} ({$record->email})";
                            })
                            ->helperText(function (callable $get) {
                                $formationId = $get('formation_id');
                                if (! $formationId) {
                                    return 'Veuillez d\'abord sélectionner une formation';
                                }
                                $capacite = $get('capacite_max') ?? 20;
                                $count = is_array($get('preinscription_ids')) ? count($get('preinscription_ids')) : 0;

                                return "Sélectionnez les candidats à attribuer à cette session ({$count}/{$capacite})";
                            })
                            ->reactive()
                            ->disabled(fn (callable $get) => empty($get('formation_id')))
                            ->afterStateUpdated(function ($state, callable $get, callable $set) {
                                $capacite = $get('capacite_max') ?? 20;
                                if (is_array($state) && count($state) > $capacite) {
                                    $limited = array_slice($state, 0, $capacite);
                                    $set('preinscription_ids', $limited);
                                }
                            })
                            ->columnSpanFull(),

                        Textarea::make('notes_attribution')
                            ->label('Notes sur l\'attribution')
                            ->rows(2)
                            ->maxLength(500)
                            ->columnSpanFull()
                            ->helperText('Notes spécifiques pour cette attribution de candidats'),
                    ])
                    ->collapsible()
                    ->collapsed(fn (callable $get) => empty($get('preinscription_ids')))
                    ->visible(fn (callable $get) => ! empty($get('formation_id'))),
            ]);
    }
}
