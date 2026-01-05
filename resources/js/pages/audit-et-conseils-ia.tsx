import { Head } from '@inertiajs/react';

import { _services } from '@/_mock';
import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { ServiceView } from '@/sections/_services/view/service-view';

// ----------------------------------------------------------------------

export default function AuditEtConseilsIAPage() {
  const { t } = useTranslate('services');
  const service = _services.find((s) => s.slug === 'audit-et-conseils-ia');
  const relatedServices = _services.filter((s) => s.slug !== 'audit-et-conseils-ia');

  const metadata = {
    title: `${t('audit.hero.title')} - Madin.IA`,
    description: t('audit.hero.description'),
    keywords: 'audit,conseil,intelligence artificielle,IA,évaluation,stratégie,entreprise,madinia',
  };

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
