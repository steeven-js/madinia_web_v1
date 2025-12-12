<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Pages;

use App\Filament\Resources\PreinscriptionFormations\PreinscriptionFormationResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePreinscriptionFormation extends CreateRecord
{
    protected static string $resource = PreinscriptionFormationResource::class;

    public function getTitle(): string
    {
        return 'Créer une pré-inscription';
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
