<?php

declare(strict_types=1);

namespace App\Filament\Resources\Sessions\Pages;

use App\Filament\Resources\Sessions\SessionResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateSession extends CreateRecord
{
    protected static string $resource = SessionResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        // Sauvegarder l'utilisateur qui crée la session
        $data['created_by'] = Auth::id();

        // Extraire les IDs des préinscriptions avant de créer la session
        $preinscriptionIds = $data['preinscription_ids'] ?? [];
        unset($data['preinscription_ids']);

        // Stocker temporairement pour l'attacher après création
        $this->preinscriptionIds = $preinscriptionIds;

        return $data;
    }

    protected function afterCreate(): void
    {
        // Attacher les préinscriptions après la création de la session
        if (! empty($this->preinscriptionIds)) {
            $this->record->preinscriptions()->attach($this->preinscriptionIds, [
                'statut_attribution' => 'attribue',
                'date_attribution' => now(),
            ]);

            // Mettre à jour le statut des préinscriptions attribuées
            \App\Models\PreinscriptionFormation::whereIn('id', $this->preinscriptionIds)
                ->update(['statut' => 'session_planifiee']);
        }
    }

    protected array $preinscriptionIds = [];
}
