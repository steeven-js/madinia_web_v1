import { Head } from '@inertiajs/react';

import { MainLayout } from '@/layouts/main';
import { ProgressBar } from '@/components/progress-bar';
import { CareerLandingView } from '@/sections/_career/view/career-landing-view';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Zone UI: The starting point for your next project',
  description:
    'The ZONE is built on top of MUI, a powerful library that provides flexible, customizable, and easy-to-use components.',
  keywords: 'react,material,kit,application,dashboard,admin,template',
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      <ProgressBar />

      <MainLayout
        slotProps={{
          header: {
            sx: {
              position: { md: 'fixed' },
              color: { md: 'common.white' },
            },
          },
        }}
      >
        <CareerLandingView />
      </MainLayout>
    </>
  );
}
