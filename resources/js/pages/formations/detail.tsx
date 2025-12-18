import type { Formation } from '@/types/formation';

import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { FormationsCourseView } from '@/sections/_formations/view/formations-course-view';

// ----------------------------------------------------------------------

interface FormationsDetailPageProps {
    formation: Formation;
    relatedFormations: Formation[];
}

export default function FormationsDetailPage({ formation, relatedFormations }: FormationsDetailPageProps) {
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

            <FormationsCourseView formation={formation} relatedFormations={relatedFormations} />
        </MainLayout>
    );
}

