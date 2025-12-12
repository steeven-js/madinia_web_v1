<?php

declare(strict_types=1);

namespace App\Enums;

enum StatutSession: string
{
    case PLANIFIEE = 'planifiee';
    case EN_COURS = 'en_cours';
    case TERMINEE = 'terminee';
    case ANNULEE = 'annulee';

    /**
     * Obtenir le label lisible
     */
    public function label(): string
    {
        return match ($this) {
            self::PLANIFIEE => 'Planifiée',
            self::EN_COURS => 'En cours',
            self::TERMINEE => 'Terminée',
            self::ANNULEE => 'Annulée',
        };
    }

    /**
     * Obtenir la couleur pour l'affichage
     */
    public function color(): string
    {
        return match ($this) {
            self::PLANIFIEE => 'blue',
            self::EN_COURS => 'green',
            self::TERMINEE => 'gray',
            self::ANNULEE => 'red',
        };
    }

    /**
     * Obtenir tous les statuts avec leurs labels
     */
    public static function options(): array
    {
        return array_map(
            fn (self $statut) => [
                'value' => $statut->value,
                'label' => $statut->label(),
                'color' => $statut->color(),
            ],
            self::cases()
        );
    }
}
