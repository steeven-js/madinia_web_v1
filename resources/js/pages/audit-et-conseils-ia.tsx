import { Head } from '@inertiajs/react';

import { _services } from '@/_mock';
import { MainLayout } from '@/layouts/main';

import { ServiceView } from '@/sections/_services/view/service-view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Audit & Conseils IA - Madin.IA',
  description:
    "Audit et conseils en intelligence artificielle pour votre entreprise. Évaluation de votre maturité IA et recommandations stratégiques personnalisées.",
  keywords: 'audit,conseil,intelligence artificielle,IA,évaluation,stratégie,entreprise,madinia',
};

export default function AuditEtConseilsIAPage() {
  const service = _services.find((s) => s.slug === 'audit-et-conseils-ia');
  const relatedServices = _services.filter((s) => s.slug !== 'audit-et-conseils-ia');

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
