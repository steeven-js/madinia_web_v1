import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { CareerAboutView } from '@/sections/_career/view/career-about-view';

// ----------------------------------------------------------------------

export default function AboutPage() {
  const { t } = useTranslate('pages');

  const metadata = {
    title: `${CONFIG.appName} | ${t('about.hero.title')}`,
    description: t('about.hero.description').split('\n\n')[0],
    keywords: 'à propos,madin.ia,équipe,mission,vision,intelligence artificielle,martinique',
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
      </Head>

      <CareerAboutView />
    </MainLayout>
  );
}
