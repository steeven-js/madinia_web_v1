<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\FormatFormation;
use App\Enums\StatutSession;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Session extends Model
{
    protected $table = 'formation_sessions';

    protected $fillable = [
        'formation_id',
        'date_debut',
        'date_fin',
        'heure_debut',
        'heure_fin',
        'lieu',
        'format',
        'capacite_max',
        'statut',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
        'format' => FormatFormation::class,
        'statut' => StatutSession::class,
        'capacite_max' => 'integer',
    ];

    /**
     * Relation avec la formation
     */
    public function formation(): BelongsTo
    {
        return $this->belongsTo(Formation::class);
    }

    /**
     * Relation avec l'utilisateur créateur
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Relation many-to-many avec les préinscriptions
     */
    public function preinscriptions(): BelongsToMany
    {
        return $this->belongsToMany(
            PreinscriptionFormation::class,
            'preinscription_formation_session',
            'session_id',
            'preinscription_formation_id'
        )->withPivot(['statut_attribution', 'date_attribution', 'notes'])
            ->withTimestamps();
    }

    /**
     * Obtenir le nombre de participants attribués
     */
    public function getNombreParticipantsAttribute(): int
    {
        return $this->preinscriptions()
            ->wherePivot('statut_attribution', '!=', 'annule')
            ->count();
    }

    /**
     * Vérifier si la session est complète
     */
    public function estComplete(): bool
    {
        return $this->nombre_participants >= $this->capacite_max;
    }

    /**
     * Vérifier si la session a encore de la place
     */
    public function aDeLaPlace(): bool
    {
        return $this->nombre_participants < $this->capacite_max;
    }

    /**
     * Obtenir le nombre de places restantes
     */
    public function getPlacesRestantesAttribute(): int
    {
        return max(0, $this->capacite_max - $this->nombre_participants);
    }

    /**
     * Scope pour filtrer par statut
     */
    public function scopeParStatut($query, StatutSession $statut)
    {
        return $query->where('statut', $statut);
    }

    /**
     * Scope pour filtrer par formation
     */
    public function scopeParFormation($query, int $formationId)
    {
        return $query->where('formation_id', $formationId);
    }

    /**
     * Scope pour les sessions à venir
     */
    public function scopeAVenir($query)
    {
        return $query->where('date_debut', '>=', now()->toDateString());
    }

    /**
     * Scope pour les sessions en cours
     */
    public function scopeEnCours($query)
    {
        return $query->where('statut', StatutSession::EN_COURS)
            ->orWhere(function ($q) {
                $q->where('statut', StatutSession::PLANIFIEE)
                    ->where('date_debut', '<=', now()->toDateString())
                    ->where(function ($sq) {
                        $sq->whereNull('date_fin')
                            ->orWhere('date_fin', '>=', now()->toDateString());
                    });
            });
    }
}
