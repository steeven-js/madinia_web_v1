import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { CareerAboutView } from '@/sections/_career/view/career-about-view';

// ----------------------------------------------------------------------

const metadata = {
  title: `À propos - ${CONFIG.appName}`,
  description:
    'Découvrez MADIN.IA, votre partenaire en intelligence artificielle. Notre mission, notre vision et notre équipe dédiée à la démocratisation de l\'IA.',
  keywords: 'à propos,madin.ia,équipe,mission,vision,intelligence artificielle,martinique',
};

export default function AboutPage() {
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
      </Head>

      <CareerAboutView />
    </MainLayout>
  );
}
