import type { Formation } from '@/types/formation';

import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { CatalogueCourseView } from '@/sections/_catalogue/view/catalogue-course-view';

// ----------------------------------------------------------------------

interface CatalogueDetailPageProps {
    formation: Formation;
    relatedFormations: Formation[];
}

export default function CatalogueDetailPage({ formation, relatedFormations }: CatalogueDetailPageProps) {
    const metadata = {
        title: `${formation.title} - ${CONFIG.appName}`,
        description: formation.short_description || formation.description,
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
            </Head>

            <CatalogueCourseView formation={formation} relatedFormations={relatedFormations} />
        </MainLayout>
    );
}

