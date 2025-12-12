<?php

declare(strict_types=1);

namespace App\Enums;

enum MoyenFinancement: string
{
    case CPF = 'cpf';
    case OPCO = 'opco';
    case FRANCE_TRAVAIL = 'france_travail';
    case AUTOFINANCEMENT = 'autofinancement';
    case AUTRE = 'autre';

    /**
     * Obtenir le label lisible
     */
    public function label(): string
    {
        return match ($this) {
            self::CPF => 'CPF (Compte Personnel de Formation)',
            self::OPCO => 'OPCO (Opérateur de Compétences)',
            self::FRANCE_TRAVAIL => 'France Travail (Pôle Emploi)',
            self::AUTOFINANCEMENT => 'Autofinancement',
            self::AUTRE => 'Autre moyen de financement',
        };
    }

    /**
     * Obtenir tous les moyens de financement avec leurs labels
     */
    public static function options(): array
    {
        return array_map(
            fn (self $moyen) => [
                'value' => $moyen->value,
                'label' => $moyen->label(),
            ],
            self::cases()
        );
    }
}
