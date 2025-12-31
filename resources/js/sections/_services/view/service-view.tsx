import type { IServiceProps } from '@/types/service';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { _socials } from '@/_mock';

import { Iconify } from '@/components/iconify';

import { Advertisement } from '@/sections/advertisement';
import { CareerNewsletter } from '@/sections/_career/career-newsletter';
import { ServiceDetailsInfo } from '../details/service-details-info';
import { ServiceDetailsHero } from '../details/service-details-hero';
import { ServiceDetailsSummary } from '../details/service-details-summary';

// ----------------------------------------------------------------------

type ViewProps = {
  service?: IServiceProps;
  relatedServices?: IServiceProps[];
};

export function ServiceView({ service, relatedServices }: ViewProps) {
  const renderSocials = () => (
    <Box sx={{ gap: 1.5, display: 'flex', mt: 5 }}>
      <Box component="span" sx={{ lineHeight: '30px', typography: 'subtitle2' }}>
        Partager:
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
          <Box
            key={social.value}
            component="a"
            href="#"
            sx={{
              gap: 1,
              display: 'flex',
              alignItems: 'center',
              typography: 'body2',
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {social.value === 'twitter' && <Iconify icon="socials:twitter" width={20} />}
            {social.value === 'facebook' && <Iconify icon="socials:facebook" width={20} />}
            {social.value === 'instagram' && <Iconify icon="socials:instagram" width={20} />}
            {social.value === 'linkedin' && <Iconify icon="socials:linkedin" width={20} />}
            {social.label}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <ServiceDetailsHero
        title={service?.title || ''}
        category={service?.category || ''}
        totalViews={service?.totalViews}
      />
      <Container sx={{ pb: 10, mt: { xs: 5, md: 10 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid size={{ xs: 12, md: 7, lg: 8 }}>
            <ServiceDetailsSummary
              content={service?.content || ''}
              features={service?.features || []}
              benefits={service?.benefits || []}
            />

            <Divider sx={{ mt: 5 }} />

            {renderSocials()}
          </Grid>

          <Grid
            sx={{ gap: 5, display: 'flex', flexDirection: 'column' }}
            size={{ xs: 12, md: 5, lg: 4 }}
          >
            <ServiceDetailsInfo category={service?.category} />

            <Advertisement
              title="Autres services"
              description="Découvrez nos autres services en intelligence artificielle"
              imageUrl="/assets/images/career/newsletter.webp"
            />
          </Grid>
        </Grid>
      </Container>
      <CareerNewsletter />
    </>
  );
}

