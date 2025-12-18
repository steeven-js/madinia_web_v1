import { Head } from '@inertiajs/react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { CtaPreinscription } from '@/components/cta-preinscription';

import { MarketingContactForm } from '@/sections/_contact/contact-form';
import { MarketingContactInfo } from '@/sections/_contact/contact-info';

// ----------------------------------------------------------------------

const metadata = {
  title: `Contact - ${CONFIG.appName}`,
  description:
    'Contactez MADIN.IA pour vos projets en intelligence artificielle. Formations, conférences, audit et accompagnement personnalisé.',
  keywords: 'contact,madin.ia,intelligence artificielle,formation,conseil,martinique',
};

export default function ContactPage() {
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
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      {/* Section d'en-tête */}
      <Box
        sx={{
          pt: { xs: 12, md: 15 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Container>
          <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="h2" component="h1" color="primary.main">
              Contactez-nous
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                maxWidth: 600,
                lineHeight: 1.6,
              }}
            >
              Une question ? Un projet ? N'hésitez pas à nous contacter, nous vous répondrons dans les plus brefs délais.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Section du formulaire */}
      <Container
        sx={{
          py: { xs: 6, md: 10 },
        }}
      >
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <MarketingContactInfo />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack spacing={2} sx={{ mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  Envoyez-nous un message
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </Typography>
              </Stack>

              <MarketingContactForm />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <CtaPreinscription />
    </MainLayout>
  );
}
