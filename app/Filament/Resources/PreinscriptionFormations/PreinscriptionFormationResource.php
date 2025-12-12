<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations;

use App\Filament\Resources\PreinscriptionFormations\Pages\CreatePreinscriptionFormation;
use App\Filament\Resources\PreinscriptionFormations\Pages\EditPreinscriptionFormation;
use App\Filament\Resources\PreinscriptionFormations\Pages\ListPreinscriptionFormations;
use App\Filament\Resources\PreinscriptionFormations\Pages\ViewPreinscriptionFormation;
use App\Filament\Resources\PreinscriptionFormations\Schemas\PreinscriptionFormationForm;
use App\Filament\Resources\PreinscriptionFormations\Schemas\PreinscriptionFormationInfolist;
use App\Filament\Resources\PreinscriptionFormations\Tables\PreinscriptionFormationsTable;
use App\Models\PreinscriptionFormation;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class PreinscriptionFormationResource extends Resource
{
    protected static ?string $model = PreinscriptionFormation::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedUserGroup;

    protected static string|UnitEnum|null $navigationGroup = 'Formations';

    protected static ?string $navigationLabel = 'Pré-inscriptions';

    protected static ?string $modelLabel = 'Pré-inscription';

    protected static ?string $pluralModelLabel = 'Pré-inscriptions';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return PreinscriptionFormationForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return PreinscriptionFormationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return PreinscriptionFormationsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPreinscriptionFormations::route('/'),
            'create' => CreatePreinscriptionFormation::route('/create'),
            'view' => ViewPreinscriptionFormation::route('/{record}'),
            'edit' => EditPreinscriptionFormation::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        $count = static::getModel()::where('statut', 'en_attente')->count();

        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}
