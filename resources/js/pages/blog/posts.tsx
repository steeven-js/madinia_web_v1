import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { CareerPostsView } from '@/sections/_career/view/career-posts-view';

// ----------------------------------------------------------------------

const metadata = {
  title: `Blog - ${CONFIG.appName}`,
  description: 'Découvrez nos articles sur l\'intelligence artificielle, les formations et les actualités MADIN.IA.',
};

export default function BlogPostsPage() {
  return (
    <MainLayout>
      <Head title={metadata.title}>
        <meta name="description" content={metadata.description} />
      </Head>

      <CareerPostsView />
    </MainLayout>
  );
}
