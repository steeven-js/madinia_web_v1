import { Head } from '@inertiajs/react';
import { useMemo } from 'react';

import { _services } from '@/_mock';
import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { ServiceView } from '@/sections/_services/view/service-view';
import type { IServiceProps } from '@/types/service';

// ----------------------------------------------------------------------

export default function ConferenceIAPage() {
  const { t } = useTranslate('services');

  // Construire le service depuis les traductions
  const service = useMemo<IServiceProps | undefined>(() => {
    const objectives = (t('conference.objectives.goals', { returnObjects: true }) || []) as string[];
    const formatDetails = (t('conference.format.details', { returnObjects: true }) || []) as string[];
    const benefits = (t('conference.benefits.items', { returnObjects: true }) || []) as string[];

    // Construire le contenu HTML depuis les traductions
    const content = `
      <h5>${t('conference.hero.title')}</h5>
      <p>${t('conference.hero.description')}</p>
      <p>${t('conference.hero.additionalInfo')}</p>
      <h6>${t('conference.objectives.title')}</h6>
      <ul>
        ${objectives.map((goal) => `<li>${goal}</li>`).join('')}
      </ul>
      <h6>${t('conference.format.title')}</h6>
      <ul>
        ${formatDetails.map((detail) => `<li>${detail}</li>`).join('')}
      </ul>
    `;

    // Utiliser les objectifs comme features (premiers 4)
    const features = Array.isArray(objectives) ? objectives.slice(0, 4) : [];

    // Utiliser les benefits depuis les traductions
    const benefitsList = Array.isArray(benefits) ? benefits.slice(0, 4) : [];

    return {
      id: '1',
      slug: 'conference-ia',
      title: t('conference.hero.title'),
      category: t('conference.hero.subtitle'),
      description: t('conference.hero.description'),
      content,
      features,
      benefits: benefitsList,
      totalViews: 245,
    };
  }, [t]);

  const relatedServices = _services.filter((s) => s.slug !== 'conference-ia');

  const metadata = {
    title: `${t('conference.hero.title')} - Madin.IA`,
    description: t('conference.hero.description'),
    keywords: 'conférence,intelligence artificielle,IA,formation,entreprise,institution,école,madinia',
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
