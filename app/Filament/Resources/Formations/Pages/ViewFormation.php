<?php

declare(strict_types=1);

namespace App\Filament\Resources\Formations\Pages;

use App\Filament\Resources\Formations\FormationResource;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewFormation extends ViewRecord
{
    protected static string $resource = FormationResource::class;

    protected static ?string $navigationLabel = 'Détails';

    protected function getHeaderActions(): array
    {
        $previousId = $this->getPreviousRecordId();
        $nextId = $this->getNextRecordId();

        return [
            Action::make('previous')
                ->label('Précédent')
                ->icon('heroicon-m-chevron-left')
                ->color('gray')
                ->disabled(fn () => $previousId === null)
                ->url(fn () => $previousId ? FormationResource::getUrl('view', ['record' => $previousId]) : null),

            Action::make('next')
                ->label('Suivant')
                ->icon('heroicon-m-chevron-right')
                ->color('gray')
                ->disabled(fn () => $nextId === null)
                ->url(fn () => $nextId ? FormationResource::getUrl('view', ['record' => $nextId]) : null),

            EditAction::make()
                ->label('Modifier'),
        ];
    }

    public function getTitle(): string
    {
        return $this->record->title ?? 'Formation';
    }

    private function getPreviousRecordId(): ?int
    {
        $modelClass = static::getResource()::getModel();

        return (int) ($modelClass::query()
            ->where('order', '<', $this->record->order)
            ->orderBy('order', 'desc')
            ->value('id') ?? 0) ?: null;
    }

    private function getNextRecordId(): ?int
    {
        $modelClass = static::getResource()::getModel();

        return (int) ($modelClass::query()
            ->where('order', '>', $this->record->order)
            ->orderBy('order', 'asc')
            ->value('id') ?? 0) ?: null;
    }
}
