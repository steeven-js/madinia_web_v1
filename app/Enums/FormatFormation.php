<?php

declare(strict_types=1);

namespace App\Enums;

enum FormatFormation: string
{
    case PRESENTIEL = 'presentiel';
    case DISTANCIEL = 'distanciel';
    case HYBRIDE = 'hybride';

    /**
     * Obtenir le label lisible
     */
    public function label(): string
    {
        return match ($this) {
            self::PRESENTIEL => 'Présentiel',
            self::DISTANCIEL => 'Distanciel (en ligne)',
            self::HYBRIDE => 'Hybride (présentiel + distanciel)',
        };
    }

    /**
     * Obtenir tous les formats avec leurs labels
     */
    public static function options(): array
    {
        return array_map(
            fn (self $format) => [
                'value' => $format->value,
                'label' => $format->label(),
            ],
            self::cases()
        );
    }
}
