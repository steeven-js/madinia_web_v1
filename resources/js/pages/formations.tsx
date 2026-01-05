import type { FormationsPageProps } from '@/types/formation';

import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { FormationsView } from '@/sections/_formations';

// ----------------------------------------------------------------------

export default function FormationsPage({ formations }: FormationsPageProps) {
    const { t } = useTranslate('pages');

    const metadata = {
        title: `${t('formations.hero.title')} - ${CONFIG.appName}`,
        description: t('formations.hero.description'),
        keywords: 'formations,intelligence artificielle,IA,apprentissage,compétences,certification,madinia',
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

            <FormationsView formations={formations} />
        </MainLayout>
    );
}

