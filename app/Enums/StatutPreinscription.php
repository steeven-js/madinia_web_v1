<?php

declare(strict_types=1);

namespace App\Enums;

enum StatutPreinscription: string
{
    case EN_ATTENTE = 'en_attente';
    case GROUPE_EN_CONSTITUTION = 'groupe_en_constitution';
    case GROUPE_COMPLET = 'groupe_complet';
    case SESSION_PLANIFIEE = 'session_planifiee';
    case INSCRIT = 'inscrit';
    case ANNULE = 'annule';

    /**
     * Obtenir le label lisible
     */
    public function label(): string
    {
        return match ($this) {
            self::EN_ATTENTE => 'En attente',
            self::GROUPE_EN_CONSTITUTION => 'Groupe en constitution',
            self::GROUPE_COMPLET => 'Groupe complet',
            self::SESSION_PLANIFIEE => 'Session planifiée',
            self::INSCRIT => 'Inscrit',
            self::ANNULE => 'Annulé',
        };
    }

    /**
     * Obtenir la couleur pour l'affichage
     */
    public function color(): string
    {
        return match ($this) {
            self::EN_ATTENTE => 'gray',
            self::GROUPE_EN_CONSTITUTION => 'blue',
            self::GROUPE_COMPLET => 'orange',
            self::SESSION_PLANIFIEE => 'green',
            self::INSCRIT => 'green',
            self::ANNULE => 'red',
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
