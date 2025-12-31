import { Head } from '@inertiajs/react';

import { _services } from '@/_mock';
import { MainLayout } from '@/layouts/main';

import { ServiceView } from '@/sections/_services/view/service-view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Conférence IA - Madin.IA',
  description:
    "Conférences sur l'intelligence artificielle pour entreprises, institutions et écoles. Sensibilisation et introduction aux enjeux de l'IA.",
  keywords: 'conférence,intelligence artificielle,IA,formation,entreprise,institution,école,madinia',
};

export default function ConferenceIAPage() {
  const service = _services.find((s) => s.slug === 'conference-ia');
  const relatedServices = _services.filter((s) => s.slug !== 'conference-ia');

  return (
    <MainLayout>
      <Head title={metadata.title}>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      <ServiceView service={service} relatedServices={relatedServices} />
    </MainLayout>
  );
}
