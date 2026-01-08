import type { Formation } from '@/types/formation';

import { _madiniaClients } from '@/_mock';
import { CareerOurClients } from '../career-our-clients';
import { CareerLandingHero } from '../landing/career-landing-hero';
import { CareerLandingTerritoires } from '../landing/career-landing-territoires';
import { CareerLandingForRecruiters } from '../landing/career-landing-for-recruiters';

import { HomeFAQs } from '@/sections/_home/home-faqs';
import { CtaPreinscription } from '@/components/cta-preinscription';

// ----------------------------------------------------------------------

interface CareerLandingViewProps {
    formations?: Formation[];
}

export function CareerLandingView({ formations = [] }: CareerLandingViewProps) {
    return (
        <>
            <CareerLandingHero />

            <CareerOurClients brands={_madiniaClients} />

            <CareerLandingTerritoires />
            
            <CareerLandingForRecruiters formations={formations} />
            
            <CtaPreinscription />

            <HomeFAQs />

        </>
    );
}
