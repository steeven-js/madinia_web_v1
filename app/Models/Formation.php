<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\SupabaseHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Formation extends Model
{
    protected $fillable = [
        'formation_category_id',
        'title',
        'slug',
        'short_description',
        'description',
        'image',
        'pdf_file',
        'duration',
        'show_duration',
        'certification',
        'level',
        'objectives',
        'show_objectives',
        'prerequisites',
        'show_prerequisites',
        'program',
        'show_program',
        'target_audience',
        'training_methods',
        'order',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'certification' => 'boolean',
        'is_published' => 'boolean',
        'show_duration' => 'boolean',
        'show_objectives' => 'boolean',
        'show_prerequisites' => 'boolean',
        'show_program' => 'boolean',
        'published_at' => 'datetime',
        'duration' => 'integer',
        'order' => 'integer',
    ];

    protected $appends = [
        'image_url',
        'pdf_file_url',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($formation) {
            if (empty($formation->slug)) {
                $formation->slug = Str::slug($formation->title);
            }
            if ($formation->is_published && empty($formation->published_at)) {
                $formation->published_at = now();
            }
        });

        static::updating(function ($formation) {
            if ($formation->isDirty('title') && empty($formation->slug)) {
                $formation->slug = Str::slug($formation->title);
            }
            if ($formation->is_published && empty($formation->published_at)) {
                $formation->published_at = now();
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(FormationCategory::class, 'formation_category_id');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeOrderByPosition($query)
    {
        return $query->orderBy('order');
    }

    public function getFormattedDurationAttribute(): string
    {
        if ($this->duration < 1) {
            return '';
        }

        return $this->duration.' heure'.($this->duration > 1 ? 's' : '');
    }

    public function getLevelLabelAttribute(): string
    {
        return match ($this->level) {
            'debutant' => 'Débutant',
            'intermediaire' => 'Intermédiaire',
            'avance' => 'Avancé',
            default => $this->level,
        };
    }

    public function getCertificationLabelAttribute(): string
    {
        return $this->certification ? 'Certifiante' : 'Non certifiante';
    }

    public function getImageUrlAttribute(): ?string
    {
        if (empty($this->image)) {
            return null;
        }

        return SupabaseHelper::getPublicUrl($this->image);
    }

    public function getPdfFileUrlAttribute(): ?string
    {
        if (empty($this->pdf_file)) {
            return null;
        }

        return SupabaseHelper::getPublicUrl($this->pdf_file);
    }
}
