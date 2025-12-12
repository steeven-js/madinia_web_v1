<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cv extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'github',
        'bio',
        'titre_professionnel',
        'formations',
        'langues',
        'competences_techniques',
        'savoir_etre',
        'contexte_travail',
        'experiences',
        'fichier_pdf',
    ];
}
