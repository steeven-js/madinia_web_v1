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
  title: 'Accompagnement Personnalisé - Madin.IA',
  description:
    'Accompagnement personnalisé en intelligence artificielle pour votre entreprise. Formations sur mesure et conseils adaptés à vos besoins spécifiques.',
  keywords: 'accompagnement,formation,intelligence artificielle,IA,personnalisé,consulting,madinia',
};

const features = [
  {
    icon: 'solar:user-hands-bold',
    title: 'Sur mesure',
    description: 'Formation adaptée à vos besoins et objectifs spécifiques',
  },
  {
    icon: 'solar:calendar-mark-bold',
    title: 'Flexible',
    description: 'Rythme et format ajustés selon votre disponibilité',
  },
  {
    icon: 'solar:medal-star-bold',
    title: 'Expertise dédiée',
    description: 'Accompagnement par un expert tout au long de votre parcours',
  },
];

export default function AccompagnementPersoPage() {
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
              Accompagnement Personnalisé
            </Typography>

            <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: 720 }}>
              Un accompagnement sur mesure pour réussir votre transformation IA
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
              Notre service d'accompagnement personnalisé vous offre une formation sur mesure en
              intelligence artificielle, adaptée à vos besoins spécifiques et à votre contexte
              professionnel.
            </Typography>

            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              Bénéficiez d'un suivi individuel avec un expert dédié qui vous guide à chaque étape de
              votre parcours d'apprentissage, du niveau débutant à l'expertise avancée.
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
