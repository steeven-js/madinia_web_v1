import { Head } from '@inertiajs/react';

import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { ServiceAccompagnementView } from '@/sections/_services/view/service-accompagnement-view';

// ----------------------------------------------------------------------

export default function AccompagnementPersoPage() {
  const { t } = useTranslate('services');

  const metadata = {
    title: `${t('accompagnementPerso.hero.title')} - Madin.IA`,
    description: t('accompagnementPerso.hero.description'),
    keywords: 'accompagnement,formation,intelligence artificielle,IA,personnalisé,consulting,madinia',
  };

  return (
    <MainLayout>
      <Head title={metadata.title}>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      <ServiceAccompagnementView />
    </MainLayout>
  );
}
