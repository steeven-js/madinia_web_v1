import { Head } from '@inertiajs/react';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { Iconify } from '@/components/iconify';
import { CtaPreinscription } from '@/components/cta-preinscription';

// ----------------------------------------------------------------------

const metadata = {
  title: 'Conférence IA - Madin.IA',
  description:
    "Conférences sur l'intelligence artificielle pour entreprises, institutions et écoles. Sensibilisation et introduction aux enjeux de l'IA.",
  keywords: 'conférence,intelligence artificielle,IA,formation,entreprise,institution,école,madinia',
};

const features = [
  {
    icon: 'solar:users-group-rounded-bold',
    title: 'Pour tous les publics',
    description: 'Entreprises, institutions, écoles et établissements',
  },
  {
    icon: 'solar:clock-circle-bold',
    title: 'Format flexible',
    description: 'De 1h à 3h selon vos besoins',
  },
  {
    icon: 'solar:lightbulb-bolt-bold',
    title: 'Contenu adapté',
    description: 'Personnalisé selon votre secteur',
  },
];

export default function ConferenceIAPage() {
  const theme = useTheme();

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

      <Box sx={{ minHeight: '100vh' }}>
        <Container sx={{ py: { xs: 10, md: 15 } }}>
          {/* Hero Section */}
          <Stack spacing={3} alignItems="center" textAlign="center" sx={{ mb: 8 }}>
            <Typography variant="h1" color="primary.main">
              Conférence IA
            </Typography>

            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 720 }}>
              Sensibilisez vos équipes aux enjeux et opportunités de l'intelligence artificielle
            </Typography>
          </Stack>

          {/* Description */}
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              mb: 6,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
              Nos conférences sur l'intelligence artificielle sont conçues pour introduire les concepts
              clés de l'IA, démystifier cette technologie et présenter ses applications concrètes dans
              votre secteur d'activité.
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              Que vous soyez une entreprise, une institution publique ou un établissement d'enseignement,
              nous adaptons notre contenu à votre audience pour un impact maximal.
            </Typography>
          </Card>

          {/* Features */}
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              mb: 6,
            }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  }}
                >
                  <Iconify
                    icon={feature.icon}
                    width={32}
                    style={{ color: theme.palette.primary.main }}
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {feature.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>

        <CtaPreinscription />
      </Box>
    </MainLayout>
  );
}
