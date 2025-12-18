import type { ICourseProps } from '@/types/course';
import type { Formation } from '@/types/formation';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { _mock, _socials } from '@/_mock';

import { Iconify } from '@/components/iconify';
import { CtaPreinscription } from '@/components/cta-preinscription';

// import { Advertisement } from '../../advertisement';
// import { FormationsNewsletter } from '../formations-newsletter';
import { FormationsListSimilar } from '../list/formations-list-similar';
import { FormationsDetailsHero } from '../details/formations-details-hero';
import { FormationsDetailsInfo } from '../details/formations-details-info';
import { FormationsDetailsSummary } from '../details/formations-details-summary';
// import { FormationsDetailsTeachers } from '../details/formations-details-teachers-info';

// ----------------------------------------------------------------------

type ViewProps = {
  course?: ICourseProps;
  relatedCourses?: ICourseProps[];
  formation?: Formation;
  relatedFormations?: Formation[];
};

export function FormationsCourseView({ course, relatedCourses, formation, relatedFormations }: ViewProps) {
  // Utiliser les vraies données de formation si disponibles, sinon mock
  const displayFormation = formation;
  const displayRelatedFormations = relatedFormations || [];

  const renderSocials = () => (
    <Box sx={{ gap: 1.5, display: 'flex', mt: 5 }}>
      <Box component="span" sx={{ lineHeight: '30px', typography: 'subtitle2' }}>
        Partager :
      </Box>

      <Box
        sx={{
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {_socials.map((social) => (
          <Button
            key={social.value}
            size="small"
            variant="outlined"
            startIcon={
              <>
                {social.value === 'twitter' && <Iconify icon="socials:twitter" />}
                {social.value === 'facebook' && <Iconify icon="socials:facebook" />}
                {social.value === 'instagram' && <Iconify icon="socials:instagram" />}
                {social.value === 'linkedin' && <Iconify icon="socials:linkedin" />}
              </>
            }
          >
            {social.label}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      {displayFormation && (
        <FormationsDetailsHero
          formation={displayFormation}
        />
      )}

      {displayFormation && (
        <Container sx={{ py: { xs: 5, md: 10 } }}>
          <Grid container spacing={{ xs: 5, md: 8 }}>
            <Grid size={{ xs: 12, md: 7, lg: 8 }}>
              <FormationsDetailsSummary formation={displayFormation} />

              {/* {renderSocials()} */}
            </Grid>

            <Grid size={{ xs: 12, md: 5, lg: 4 }}>
              <FormationsDetailsInfo formation={displayFormation} sx={{ mb: 5 }} />
            </Grid>
          </Grid>
        </Container>
      )}

      {!!displayRelatedFormations.length && (
        <FormationsListSimilar formations={displayRelatedFormations} />
      )}

      <CtaPreinscription />

      {/* <CatalogueNewsletter /> */}
    </>
  );
}

