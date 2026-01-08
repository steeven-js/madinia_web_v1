import { Head } from '@inertiajs/react';
import { useMemo } from 'react';

import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { PolitiqueConfidentialiteView } from '@/sections/politique-confidentialite';

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  const { t } = useTranslate('pages');

  // Construire les données depuis les traductions
  const politiqueConfidentialiteData = useMemo(() => {
    const articles = (t('privacyPolicy.articles', { returnObjects: true }) || []) as any[];

    return {
      titre: t('privacyPolicy.titre'),
      articles: articles.map((article) => ({
        numero: article.numero,
        titre: article.titre,
        contenu: article.contenu,
        droits: article.droits,
        contact_email: article.contact_email,
      })),
    };
  }, [t]);

  const metadata = {
    title: t('privacyPolicy.meta.title'),
    description: t('privacyPolicy.meta.description'),
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
      </Head>

      <PolitiqueConfidentialiteView data={politiqueConfidentialiteData} labels={t('privacyPolicy.labels', { returnObjects: true })} />
    </MainLayout>
  );
}
