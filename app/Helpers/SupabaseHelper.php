<?php

declare(strict_types=1);

namespace App\Helpers;

class SupabaseHelper
{
    /**
     * Génère l'URL publique pour un fichier Supabase Storage
     */
    public static function getPublicUrl(?string $path): ?string
    {
        if (empty($path)) {
            return null;
        }

        $projectRef = config('filesystems.disks.supabase.project_ref');
        $bucket = config('filesystems.disks.supabase.bucket');

        if (empty($projectRef) || empty($bucket)) {
            return null;
        }

        // URL publique Supabase : https://PROJECT_REF.supabase.co/storage/v1/object/public/BUCKET/PATH
        return "https://{$projectRef}.supabase.co/storage/v1/object/public/{$bucket}/{$path}";
    }
}
