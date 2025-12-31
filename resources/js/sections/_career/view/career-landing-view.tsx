import { CareerLandingHero } from '../landing/career-landing-hero';
import { CareerLandingTerritoires } from '../landing/career-landing-territoires';

import { HomeFAQs } from '@/sections/_home/home-faqs';

// ----------------------------------------------------------------------

export function CareerLandingView() {
  return (
    <>
      <CareerLandingHero />

      <CareerLandingTerritoires />

      <HomeFAQs />
    </>
  );
}
