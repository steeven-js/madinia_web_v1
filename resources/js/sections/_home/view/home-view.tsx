import { _pricingHome } from '@/_mock';

import { BackToTopButton } from '@/components/animate/back-to-top-button';
import { ScrollProgress, useScrollProgress } from '@/components/animate/scroll-progress';

import { HomeCareerHero } from '../home-career-hero';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTopButton />

      <HomeCareerHero />
    </>
  );
}
