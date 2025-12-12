<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Madinia extends Model
{
    protected $table = 'madinia';

    protected $fillable = [
        'name',
        'contact_principal_id',
        'telephone',
        'email',
        'site_web',
        'siret',
        'numero_nda',
        'pays',
        'adresse',
        'description',
        'reseaux_sociaux',
        'nom_compte_bancaire',
        'nom_banque',
        'numero_compte',
        'iban_bic_swift',
    ];

    protected function casts(): array
    {
        return [
            'reseaux_sociaux' => 'array',
        ];
    }

    public function contactPrincipal(): BelongsTo
    {
        return $this->belongsTo(User::class, 'contact_principal_id');
    }

    /**
     * Récupérer la configuration principale de l'entreprise
     */
    public static function getConfig(): ?self
    {
        return self::first();
    }
}
