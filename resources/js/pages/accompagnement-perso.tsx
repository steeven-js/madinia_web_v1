import { Head } from '@inertiajs/react';

import { MainLayout } from '@/layouts/main';

import { ServiceAccompagnementView } from '@/sections/_services/view/service-accompagnement-view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Accompagnement Personnalisé - Madin.IA',
  description:
    'Accompagnement personnalisé en intelligence artificielle pour votre entreprise. Formations sur mesure et conseils adaptés à vos besoins spécifiques.',
  keywords: 'accompagnement,formation,intelligence artificielle,IA,personnalisé,consulting,madinia',
};

export default function AccompagnementPersoPage() {
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
