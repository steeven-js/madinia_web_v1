<?php

declare(strict_types=1);

namespace App\Filament\Resources\Formations\Pages;

use App\Filament\Resources\Formations\FormationResource;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditFormation extends EditRecord
{
    protected static string $resource = FormationResource::class;

    protected static ?string $navigationLabel = 'Modifier';

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
                ->url(fn () => $previousId ? FormationResource::getUrl('edit', ['record' => $previousId]) : null),

            Action::make('next')
                ->label('Suivant')
                ->icon('heroicon-m-chevron-right')
                ->color('gray')
                ->disabled(fn () => $nextId === null)
                ->url(fn () => $nextId ? FormationResource::getUrl('edit', ['record' => $nextId]) : null),

            ViewAction::make()
                ->label('Voir'),

            DeleteAction::make()
                ->label('Supprimer'),
        ];
    }

    public function getTitle(): string
    {
        return 'Modifier : '.($this->record->title ?? 'Formation');
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
