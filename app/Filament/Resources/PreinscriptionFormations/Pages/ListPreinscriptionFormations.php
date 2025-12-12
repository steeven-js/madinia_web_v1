<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Pages;

use App\Filament\Resources\PreinscriptionFormations\PreinscriptionFormationResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPreinscriptionFormations extends ListRecords
{
    protected static string $resource = PreinscriptionFormationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    public function getTitle(): string
    {
        return 'Pré-inscriptions aux formations';
    }
}
