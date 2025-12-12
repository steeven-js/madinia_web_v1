<?php

declare(strict_types=1);

namespace App\Filament\Resources\Sessions\Pages;

use App\Filament\Resources\Sessions\SessionResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditSession extends EditRecord
{
    protected static string $resource = SessionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        // Pré-remplir les IDs des préinscriptions déjà attribuées
        $data['preinscription_ids'] = $this->record->preinscriptions()->pluck('preinscription_formations.id')->toArray();

        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Extraire les IDs des préinscriptions avant de sauvegarder
        $preinscriptionIds = $data['preinscription_ids'] ?? [];
        unset($data['preinscription_ids']);

        // Stocker temporairement pour la synchronisation après sauvegarde
        $this->preinscriptionIds = $preinscriptionIds;

        return $data;
    }

    protected function afterSave(): void
    {
        // Synchroniser les préinscriptions avec la session
        $currentIds = $this->record->preinscriptions()->pluck('preinscription_formations.id')->toArray();
        $newIds = $this->preinscriptionIds ?? [];

        // Ajouter les nouvelles attributions
        $toAdd = array_diff($newIds, $currentIds);
        if (! empty($toAdd)) {
            $this->record->preinscriptions()->attach($toAdd, [
                'statut_attribution' => 'attribue',
                'date_attribution' => now(),
            ]);
        }

        // Retirer les attributions supprimées
        $toRemove = array_diff($currentIds, $newIds);
        if (! empty($toRemove)) {
            $this->record->preinscriptions()->detach($toRemove);
        }

        // Mettre à jour les statuts des préinscriptions
        if (! empty($toAdd)) {
            \App\Models\PreinscriptionFormation::whereIn('id', $toAdd)
                ->update(['statut' => 'session_planifiee']);
        }

        if (! empty($toRemove)) {
            \App\Models\PreinscriptionFormation::whereIn('id', $toRemove)
                ->update(['statut' => 'en_attente']);
        }
    }

    protected array $preinscriptionIds = [];
}
