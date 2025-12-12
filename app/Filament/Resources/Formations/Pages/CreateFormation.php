<?php

declare(strict_types=1);

namespace App\Filament\Resources\Formations\Pages;

use App\Filament\Resources\Formations\FormationResource;
use Filament\Resources\Pages\CreateRecord;

class CreateFormation extends CreateRecord
{
    protected static string $resource = FormationResource::class;
}
