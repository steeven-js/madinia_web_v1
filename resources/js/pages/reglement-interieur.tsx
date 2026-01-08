import { Head } from '@inertiajs/react';
import { useMemo } from 'react';

import { useTranslate } from '@/locales';
import { MainLayout } from '@/layouts/main';

import { ReglementInterieurView } from '@/sections/reglement-interieur';

// ----------------------------------------------------------------------

export default function ReglementInterieurPage() {
  const { t } = useTranslate('pages');

  // Construire les données depuis les traductions
  const reglementInterieurData = useMemo(() => {
    const articles = (t('reglementInterieur.articles', { returnObjects: true }) || []) as any[];

    return {
      titre: t('reglementInterieur.titre'),
      articles: articles.map((article) => ({
        numero: article.numero,
        titre: article.titre,
        contenu: article.contenu,
        regles_specifiques: article.regles_specifiques,
        consignes_incendie: article.consignes_incendie,
        types_sanctions: article.types_sanctions,
        application: article.application,
        duree_conservation: article.duree_conservation,
        reference_legale: article.reference_legale,
      })),
    };
  }, [t]);

  const metadata = {
    title: t('reglementInterieur.meta.title'),
    description: t('reglementInterieur.meta.description'),
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

      <ReglementInterieurView data={reglementInterieurData} labels={t('reglementInterieur.labels', { returnObjects: true })} />
    </MainLayout>
  );
}
