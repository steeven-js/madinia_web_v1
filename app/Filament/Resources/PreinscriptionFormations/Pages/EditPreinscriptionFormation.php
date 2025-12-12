<?php

declare(strict_types=1);

namespace App\Filament\Resources\PreinscriptionFormations\Pages;

use App\Filament\Resources\PreinscriptionFormations\PreinscriptionFormationResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPreinscriptionFormation extends EditRecord
{
    protected static string $resource = PreinscriptionFormationResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }

    public function getTitle(): string
    {
        return 'Modifier la pré-inscription';
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
