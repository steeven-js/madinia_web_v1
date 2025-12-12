<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\FormatFormation;
use App\Enums\MoyenFinancement;
use App\Enums\StatutPreinscription;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PreinscriptionFormation extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'formation_id',
        'moyen_financement',
        'format_preference',
        'commentaires',
        'statut',
        'date_session_planifiee',
        'notifie_le',
        'groupe_reference',
        'taille_groupe_cible',
    ];

    protected $casts = [
        'moyen_financement' => MoyenFinancement::class,
        'format_preference' => FormatFormation::class,
        'statut' => StatutPreinscription::class,
        'date_session_planifiee' => 'date',
        'notifie_le' => 'datetime',
        'taille_groupe_cible' => 'integer',
    ];

    /**
     * Relation avec la formation
     */
    public function formation(): BelongsTo
    {
        return $this->belongsTo(Formation::class);
    }

    /**
     * Relation many-to-many avec les sessions
     */
    public function sessions(): BelongsToMany
    {
        return $this->belongsToMany(
            Session::class,
            'preinscription_formation_session',
            'preinscription_formation_id',
            'session_id'
        )->withPivot(['statut_attribution', 'date_attribution', 'notes'])
            ->withTimestamps();
    }

    /**
     * Scope pour filtrer par statut
     */
    public function scopeEnAttente($query)
    {
        return $query->where('statut', StatutPreinscription::EN_ATTENTE);
    }

    /**
     * Scope pour filtrer par formation
     */
    public function scopeParFormation($query, int $formationId)
    {
        return $query->where('formation_id', $formationId);
    }

    /**
     * Scope pour filtrer par groupe
     */
    public function scopeParGroupe($query, string $groupeReference)
    {
        return $query->where('groupe_reference', $groupeReference);
    }

    /**
     * Obtenir le nom complet
     */
    public function getNomCompletAttribute(): string
    {
        return "{$this->prenom} {$this->nom}";
    }

    /**
     * Vérifier si la personne a été notifiée
     */
    public function estNotifie(): bool
    {
        return $this->notifie_le !== null;
    }

    /**
     * Marquer comme notifié
     */
    public function marquerCommeNotifie(): void
    {
        $this->notifie_le = now();
        $this->save();
    }
}
