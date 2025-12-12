<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Pages;

use App\Filament\Resources\PreinscriptionFormations\PreinscriptionFormationResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewPreinscriptionFormation extends ViewRecord
{
    protected static string $resource = PreinscriptionFormationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    public function getTitle(): string
    {
        $record = $this->getRecord();

        return "Pré-inscription de {$record->prenom} {$record->nom}";
    }
}
