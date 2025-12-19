import { Head } from '@inertiajs/react';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { CareerPostView } from '@/sections/_career/view/career-post-view';

// ----------------------------------------------------------------------

const metadata = {
  title: `Article - ${CONFIG.appName}`,
  description: 'Lisez nos articles sur l\'intelligence artificielle et les formations.',
};

export default function BlogPostPage() {
  return (
    <MainLayout>
      <Head title={metadata.title}>
        <meta name="description" content={metadata.description} />
      </Head>

      <CareerPostView />
    </MainLayout>
  );
}
