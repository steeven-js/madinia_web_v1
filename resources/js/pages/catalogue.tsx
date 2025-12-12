import type { CataloguePageProps } from '@/types/formation';

import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { CatalogueView } from '@/sections/_catalogue';

// ----------------------------------------------------------------------

export default function CataloguePage({ formations }: CataloguePageProps) {
    const metadata = {
        title: `Catalogue des formations - ${CONFIG.appName}`,
        description: 'Découvrez notre catalogue complet de formations en intelligence artificielle. Formations certifiantes, tous niveaux, avec des experts reconnus.',
        keywords: 'catalogue,formations,intelligence artificielle,IA,apprentissage,compétences,certification,madinia',
    };

    return (
        <MainLayout
            slotProps={{
                header: {
                    sx: { position: { md: 'fixed' } },
                },
            }}
        >
            <Head title={metadata.title}>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords} />
                
                {/* Open Graph */}
                <meta property="og:title" content={metadata.title} />
                <meta property="og:description" content={metadata.description} />
                <meta property="og:type" content="website" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={metadata.title} />
                <meta name="twitter:description" content={metadata.description} />
            </Head>

            <CatalogueView formations={formations} />
        </MainLayout>
    );
}

