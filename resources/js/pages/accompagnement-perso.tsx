import { Head } from '@inertiajs/react';
import { useMemo } from 'react';

import { _services } from '@/_mock';
import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { ServiceView } from '@/sections/_services/view/service-view';
import type { IServiceProps } from '@/types/service';

// ----------------------------------------------------------------------

export default function AccompagnementPersoPage() {
  const { t } = useTranslate('services');

  // Construire le service depuis les traductions
  const service = useMemo<IServiceProps | undefined>(() => {
    const formatDetails = (t('accompagnementPerso.format.details', { returnObjects: true }) || []) as string[];
    const advantages = (t('accompagnementPerso.advantages.items', { returnObjects: true }) || []) as string[];

    // Construire le contenu HTML depuis les traductions
    const content = `
      <h5>${t('accompagnementPerso.hero.title')}</h5>
      <p>${t('accompagnementPerso.hero.additionalInfo')}</p>
      <p>${t('accompagnementPerso.hero.mission')}</p>
      <h6>${t('accompagnementPerso.format.title')}</h6>
      <ul>
        ${formatDetails.map((detail) => {
          const parts = detail.split(':');
          return `<li><strong>${parts[0]}</strong>${parts.length > 1 ? ' : ' + parts.slice(1).join(':') : ''}</li>`;
        }).join('')}
      </ul>
      <h6>${t('accompagnementPerso.advantages.title')}</h6>
      <ul>
        ${advantages.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `;

    // Utiliser les détails du format comme features (premiers 4)
    const features = Array.isArray(formatDetails)
      ? formatDetails.map(detail => detail.split(':')[0].trim()).slice(0, 4)
      : [];

    // Utiliser les avantages comme benefits
    const benefits = Array.isArray(advantages) 
      ? advantages.slice(0, 4)
      : [];

    return {
      id: '3',
      slug: 'accompagnement-perso',
      title: t('accompagnementPerso.hero.title'),
      category: t('accompagnementPerso.hero.subtitle'),
      description: t('accompagnementPerso.hero.description'),
      content,
      features,
      benefits,
      totalViews: 312,
    };
  }, [t]);

  const relatedServices = _services.filter((s) => s.slug !== 'accompagnement-perso');

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

      <ServiceView service={service} relatedServices={relatedServices} />
    </MainLayout>
  );
}
