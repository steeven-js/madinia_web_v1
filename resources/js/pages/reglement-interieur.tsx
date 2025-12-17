import { Head } from '@inertiajs/react';

import { MainLayout } from '@/layouts/main';
import { reglementInterieurData } from '@/data/reglement-interieur';

import { ReglementInterieurView } from '@/sections/reglement-interieur';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Madin.IA | Règlement intérieur',
  description: "Règlement intérieur de l'organisme de formation Madin.IA",
};

export default function ReglementInterieurPage() {
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

      <ReglementInterieurView data={reglementInterieurData} />
    </MainLayout>
  );
}
