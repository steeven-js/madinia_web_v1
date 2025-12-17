import { Head } from '@inertiajs/react';

import { MainLayout } from '@/layouts/main';
import { politiqueConfidentialiteData } from '@/data/politique-confidentialite';

import { PolitiqueConfidentialiteView } from '@/sections/politique-confidentialite';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Madin.IA | Politique de confidentialité',
  description: 'Politique de confidentialité Madin.IA',
};

export default function PrivacyPolicyPage() {
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

      <PolitiqueConfidentialiteView data={politiqueConfidentialiteData} />
    </MainLayout>
  );
}
