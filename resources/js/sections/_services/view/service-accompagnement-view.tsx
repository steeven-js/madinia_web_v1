import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CareerNewsletter } from '@/sections/_career/career-newsletter';
import { MarketingContactForm } from '@/sections/_contact/contact-form';
import { MarketingContactInfo } from '@/sections/_contact/contact-info';

// ----------------------------------------------------------------------

export function ServiceAccompagnementView() {
  return (
    <>
      <Box
        component="section"
        sx={{
          pt: { xs: 3, md: 5 },
          pb: { xs: 10, md: 15 },
        }}
      >
        <Container>
          <Grid
            container
            spacing={{ xs: 5, md: 3 }}
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{ justifyContent: { md: 'space-between' } }}
          >
            <Grid size={{ xs: 12, md: 6, lg: 5 }}>
              <MarketingContactInfo />
            </Grid>

            <Grid size={{ xs: 12, md: 6, lg: 6 }}>
              <Typography variant="h3" sx={{ mb: 5 }}>
                Prêt à démarrer ?
              </Typography>

              <MarketingContactForm />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <CareerNewsletter />
    </>
  );
}

