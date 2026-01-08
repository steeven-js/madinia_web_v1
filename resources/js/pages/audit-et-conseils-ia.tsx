import { Head } from '@inertiajs/react';
import { useMemo } from 'react';

import { _services } from '@/_mock';
import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { ServiceView } from '@/sections/_services/view/service-view';
import type { IServiceProps } from '@/types/service';

// ----------------------------------------------------------------------

export default function AuditEtConseilsIAPage() {
  const { t } = useTranslate('services');

  // Construire le service depuis les traductions
  const service = useMemo<IServiceProps | undefined>(() => {
    const objectives = (t('audit.objectives.goals', { returnObjects: true }) || []) as string[];
    const deliverables = (t('audit.deliverables.items', { returnObjects: true }) || []) as string[];

    // Construire le contenu HTML depuis les traductions
    const content = `
      <h5>${t('audit.hero.title')}</h5>
      <p>${t('audit.hero.additionalInfo')}</p>
      <p>${t('audit.hero.processDescription')}</p>
      <h6>${t('audit.objectives.title')}</h6>
      <ol>
        ${objectives.map((goal) => `<li><strong>${goal.split(':')[0]}</strong>${goal.includes(':') ? ' : ' + goal.split(':').slice(1).join(':') : ''}</li>`).join('')}
      </ol>
      <h6>${t('audit.deliverables.title')}</h6>
      <ul>
        ${deliverables.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `;

    // Utiliser les objectifs comme features (premiers 4)
    const features = Array.isArray(objectives) 
      ? objectives.map(goal => goal.split(':')[0].trim()).slice(0, 4)
      : [];

    // Construire les benefits depuis les livrables et les bénéfices
    const benefits = Array.isArray(deliverables) 
      ? deliverables.slice(0, 4)
      : [];

    return {
      id: '2',
      slug: 'audit-et-conseils-ia',
      title: t('audit.hero.title'),
      category: t('audit.hero.subtitle'),
      description: t('audit.hero.description'),
      content,
      features,
      benefits,
      totalViews: 189,
    };
  }, [t]);

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
