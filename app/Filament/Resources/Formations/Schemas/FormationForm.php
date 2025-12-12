<?php

declare(strict_types=1);

namespace App\Filament\Resources\Formations\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class FormationForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Section::make('Informations principales')
                    ->columnSpan(2)
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('title')
                                    ->label('Titre de la formation')
                                    ->required()
                                    ->maxLength(255)
                                    ->columnSpanFull()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                                TextInput::make('slug')
                                    ->label('Slug (URL)')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true)
                                    ->helperText('Généré automatiquement à partir du titre')
                                    ->columnSpan(1),

                                Select::make('formation_category_id')
                                    ->label('Catégorie')
                                    ->relationship('category', 'name')
                                    ->searchable()
                                    ->preload()
                                    ->createOptionForm([
                                        TextInput::make('name')
                                            ->label('Nom de la catégorie')
                                            ->required(),
                                    ])
                                    ->columnSpan(1),
                            ]),

                        Textarea::make('short_description')
                            ->label('Description courte')
                            ->rows(3)
                            ->maxLength(500)
                            ->helperText('Résumé affiché dans les listes (max 500 caractères)')
                            ->columnSpanFull(),

                        RichEditor::make('description')
                            ->label('Description complète')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'underline',
                                'strike',
                                'h2',
                                'h3',
                                'bulletList',
                                'orderedList',
                                'link',
                                'blockquote',
                            ]),
                    ]),

                Section::make('Médias')
                    ->columnSpan(1)
                    ->schema([
                        FileUpload::make('image')
                            ->label('Image de couverture')
                            ->image()
                            ->imageEditor()
                            ->imageEditorAspectRatios([
                                '16:9',
                                '4:3',
                                '1:1',
                            ])
                            ->disk('supabase')
                            ->directory('formations/images')
                            ->visibility('public')
                            ->maxSize(5120)
                            ->helperText('Format recommandé: 1200x800px')
                            ->getUploadedFileNameForStorageUsing(
                                fn ($file): string => (string) Str::uuid().'.'.$file->getClientOriginalExtension()
                            ),

                        FileUpload::make('pdf_file')
                            ->label('Fichier PDF')
                            ->acceptedFileTypes(['application/pdf'])
                            ->disk('supabase')
                            ->directory('formations/pdfs')
                            ->visibility('public')
                            ->maxSize(10240)
                            ->helperText('Brochure ou programme détaillé (max 10 MB)')
                            ->downloadable()
                            ->openable()
                            ->getUploadedFileNameForStorageUsing(
                                fn ($file): string => Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)).'-'.Str::uuid().'.pdf'
                            ),
                    ]),

                Section::make('Détails de la formation')
                    ->columnSpan(2)
                    ->collapsible()
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('duration')
                                    ->label('Durée (en heures)')
                                    ->numeric()
                                    ->suffix('h')
                                    ->minValue(0),

                                Select::make('level')
                                    ->label('Niveau')
                                    ->options([
                                        'debutant' => 'Débutant',
                                        'intermediaire' => 'Intermédiaire',
                                        'avance' => 'Avancé',
                                    ])
                                    ->default('debutant')
                                    ->required(),
                            ]),

                        Grid::make(2)
                            ->schema([
                                TextInput::make('target_audience')
                                    ->label('Public cible')
                                    ->maxLength(255)
                                    ->helperText('Ex: Professionnels, Étudiants, etc.'),

                                TextInput::make('training_methods')
                                    ->label('Modalités')
                                    ->maxLength(255)
                                    ->helperText('Ex: Présentiel, Distanciel, Hybride'),
                            ]),

                        RichEditor::make('objectives')
                            ->label('Objectifs pédagogiques')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                            ]),

                        RichEditor::make('prerequisites')
                            ->label('Prérequis')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'bulletList',
                                'orderedList',
                            ]),

                        RichEditor::make('program')
                            ->label('Programme détaillé')
                            ->columnSpanFull()
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'h3',
                                'bulletList',
                                'orderedList',
                            ]),
                    ]),

                Section::make('Publication')
                    ->columnSpan(1)
                    ->schema([
                        Toggle::make('certification')
                            ->label('Formation certifiante')
                            ->default(false),

                        Toggle::make('is_published')
                            ->label('Publié')
                            ->default(false)
                            ->helperText('La formation sera visible sur le site'),

                        DateTimePicker::make('published_at')
                            ->label('Date de publication')
                            ->helperText('Laissez vide pour utiliser la date actuelle'),

                        TextInput::make('order')
                            ->label('Ordre d\'affichage')
                            ->numeric()
                            ->default(0)
                            ->helperText('Plus petit = affiché en premier')
                            ->hidden(),

                        Toggle::make('show_duration')
                            ->label('Afficher la durée')
                            ->default(true)
                            ->helperText('Afficher la durée sur le site'),

                        Toggle::make('show_objectives')
                            ->label('Afficher les objectifs')
                            ->default(true)
                            ->helperText('Afficher les objectifs pédagogiques'),

                        Toggle::make('show_prerequisites')
                            ->label('Afficher les prérequis')
                            ->default(true)
                            ->helperText('Afficher les prérequis'),

                        Toggle::make('show_program')
                            ->label('Afficher le programme')
                            ->default(true)
                            ->helperText('Afficher le programme détaillé'),
                    ]),
            ]);
    }
}
